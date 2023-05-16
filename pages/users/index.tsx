import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react';
import useSWR from 'swr';
import { useState } from 'react';
import userForm from './form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import userApi, { User } from '@/api/users';
import Loading from '@/components/loading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'react-hot-toast';

export default function UserPage() {
  const { data, error, mutate, isLoading } = useSWR(`users`, userApi.list);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  const handleFormSaved = (user?: User) => {
    mutate();
    setShowFormModal(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Title>用户</Title>
        <div className="text-gray-500">
          <small>共 {data?.total || 0} 条记录</small>
        </div>
      </div>
      <div className="rounded-lg border bg-white p-6 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-left">ID</TableHeaderCell>
              <TableHeaderCell className="text-left">名称</TableHeaderCell>
              <TableHeaderCell>邀请者</TableHeaderCell>
              <TableHeaderCell>注册时间</TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Avatar onClick={() => handleEdit(user)}>
                    <AvatarFallback className="text-3xl">
                      {user.avatar || ''}
                    </AvatarFallback>
                  </Avatar>
                  <div>{user.name}</div>
                </TableCell>
                <TableCell onClick={() => handleEdit(user)}>
                  {user.phone_number}
                </TableCell>
                <TableCell onClick={() => handleEdit(user)}>
                  <Text>{user.referrer?.name || '--'}</Text>
                </TableCell>
                <TableCell>
                  <Text className="truncate max-w-md" title={user.created_at}>
                    {user.created_at}
                  </Text>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  <Button variant="light" onClick={() => handleEdit(user)}>
                    编辑
                  </Button>
                  <Button
                    variant="light"
                    className="text-red-500"
                    onClick={() => handleDelete(user)}
                  >
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog
        open={showFormModal}
        onOpenChange={(v: boolean) => setShowFormModal(v)}
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>编辑</DialogTitle>
          </DialogHeader>
          <userForm
            user={selectedUser}
            onSaved={handleFormSaved}
            onCancel={() => setShowFormModal(false)}
          ></userForm>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
