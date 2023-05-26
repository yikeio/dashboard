import {
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import MessageApi, { Message } from '@/api/messages';
import Loading from '@/components/loading';
import { toast } from 'react-hot-toast';
import { formatDatetime, pagginationHandler } from '@/lib/utils';
import UserCell from '@/components/user-cell';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { Button } from '@/components/ui/button';
import { MessageSquareIcon } from 'lucide-react';

export default function MessagePage() {
  const router = useRouter();
  const { data, error, mutate, isLoading } = useSWR(`messages`, () =>
    MessageApi.list(parseInt((router.query.page as string) || '1'))
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleView = (message: Message) => {
    setSelectedMessage(message);
    setShowDetailModal(true);
  };

  const handleDelete = async (message: Message) => {
    if (!confirm(`确定要删除 ${message.id} 吗？`)) {
      return;
    }

    await MessageApi.delete(message.id!);
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
            <MessageSquareIcon size={24} />
            <span>消息</span>
          </Title>
          <div className="text-gray-500">
            <small>共 {data?.total || 0} 条记录</small>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-white px-6 py-4 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-28">ID</TableHeaderCell>
              <TableHeaderCell>用户</TableHeaderCell>
              <TableHeaderCell>角色</TableHeaderCell>
              <TableHeaderCell>内容</TableHeaderCell>
              <TableHeaderCell>tokens</TableHeaderCell>
              <TableHeaderCell>对话ID</TableHeaderCell>
              <TableHeaderCell>创建时间</TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((message: Message) => (
              <TableRow key={message.id}>
                <TableCell>{message.id}</TableCell>
                <TableCell>
                  <UserCell user={message.creator} />
                </TableCell>
                <TableCell>{message.role}</TableCell>
                <TableCell>
                  <div
                    className="max-w-[10vw] xl:max-w-[30vw] truncate"
                    onClick={() => handleView(message)}
                  >
                    {message.content}
                  </div>
                </TableCell>
                <TableCell>{message.tokens_count}</TableCell>
                <TableCell>{message.conversation_id}</TableCell>
                <TableCell>
                  <Text>{formatDatetime(message.created_at)}</Text>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5"
                    onClick={() => handleView(message)}
                  >
                    查看
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5 text-red-500"
                    onClick={() => handleDelete(message)}
                  >
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end border-t pt-4">
          <ReactPaginate
            initialPage={data.current_page - 1}
            pageCount={data.last_page}
            onPageChange={pagginationHandler(router)}
          />
        </div>
      </div>
      <Dialog
        open={showDetailModal}
        onOpenChange={(v: boolean) => setShowDetailModal(v)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑</DialogTitle>
          </DialogHeader>
          {selectedMessage?.content}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}