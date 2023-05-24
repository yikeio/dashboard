import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
  Title
} from '@tremor/react';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import userApi, { User } from '@/api/users';
import Loading from '@/components/loading';
import { toast } from 'react-hot-toast';
import UserCell from '@/components/user-cell';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import { formatDatetime, pagginationHandler } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SearchIcon, UserIcon } from 'lucide-react';
import UserDetails from '@/components/user/details';
import UserState from '@/components/user/state';
import { debounce } from 'lodash';
import EmptyState from '@/components/empty-state';

export default function UserPage() {
  const router = useRouter();
  const { data, error, mutate, isLoading } = useSWR(`users`, () =>
    userApi.list(router.query)
  );
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState(router.query.search as string);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    router.push({
      pathname: '/users',
      query: { ...router.query, search: e.target.value }
    });
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowFormModal(true);
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`确定要删除 ${user.name} 吗？`)) {
      return;
    }

    await userApi.delete(user.id!);
    mutate();
    toast.success('已删除');
  };

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-end gap-4 leading-none">
          <Title className="leading-none flex items-center gap-2">
            <UserIcon size={24} />
            <span>用户</span>
          </Title>
          <div className="text-gray-500">
            <small>共 {data?.total || 0} 条记录</small>
          </div>
        </div>
        <div>
          <TextInput
            icon={SearchIcon}
            value={search}
            onChange={handleSearchInputChange}
            onCompositionEnd={() => mutate()}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="rounded-lg border bg-white px-6 py-4 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-28">ID</TableHeaderCell>
              <TableHeaderCell className="w-32">名称</TableHeaderCell>
              <TableHeaderCell>手机号</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>邀请者</TableHeaderCell>
              <TableHeaderCell className="text-center">状态</TableHeaderCell>
              <TableHeaderCell className="text-center">
                注册时间
              </TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.length <= 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex items-center justify-center">
                    <EmptyState
                      className="h-32"
                      message={
                        router.query.search
                          ? `没有找到与 "${router.query.search}" 匹配的相关记录`
                          : '暂无数据'
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {data.data.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <UserCell user={user} />
                </TableCell>
                <TableCell>{user.phone_number || '-'}</TableCell>
                <TableCell>{user.email || '-'}</TableCell>
                <TableCell>
                  {user.referrer ? <UserCell user={user.referrer} /> : '-'}
                </TableCell>
                <TableCell className="text-center">
                  <UserState user={user} />
                </TableCell>
                <TableCell className="text-center">
                  {user.created_at ? formatDatetime(user.created_at) : '-'}
                </TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5"
                    onClick={() => handleEdit(user)}
                  >
                    查看
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5 text-red-500"
                    onClick={() => handleDelete(user)}
                  >
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data.data.length > 0 && (
          <div className="flex items-center justify-end border-t pt-4">
            <ReactPaginate
              initialPage={data.current_page - 1}
              pageCount={data.last_page}
              onPageChange={pagginationHandler(router)}
            />
          </div>
        )}
      </div>
      <Dialog
        open={showFormModal}
        onOpenChange={(v: boolean) => setShowFormModal(v)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>用户详情</DialogTitle>
          </DialogHeader>
          <UserDetails user={selectedUser!} />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
