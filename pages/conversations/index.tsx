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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import ConversationApi, { Conversation } from '@/api/conversations';
import Loading from '@/components/loading';
import { toast } from 'react-hot-toast';
import { formatDatetime } from '@/lib/utils';
import UserCell from '@/components/user-cell';

export default function ConversationPage() {
  const { data, error, mutate, isLoading } = useSWR(
    `conversations`,
    ConversationApi.list
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const handleView = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowDetailModal(true);
  };

  const handleDelete = async (conversation: Conversation) => {
    if (!confirm(`确定要删除 ${conversation.title} 吗？`)) {
      return;
    }

    await ConversationApi.delete(conversation.id!);
    mutate();
    toast.success('已删除');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Title>对话</Title>
        <div className="text-gray-500">
          <small>共 {data?.total || 0} 条记录</small>
        </div>
      </div>
      <div className="rounded-lg border bg-white p-6 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-left">ID</TableHeaderCell>
              <TableHeaderCell className="text-left">用户</TableHeaderCell>
              <TableHeaderCell>消息条数</TableHeaderCell>
              <TableHeaderCell>tokens</TableHeaderCell>
              <TableHeaderCell>首次对话</TableHeaderCell>
              <TableHeaderCell>最后对话</TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((conversation: Conversation) => (
              <TableRow key={conversation.id}>
                <TableCell>{conversation.id}</TableCell>
                <TableCell>
                  <UserCell user={conversation.creator} />
                </TableCell>
                <TableCell>{conversation.messages_count}</TableCell>
                <TableCell>{conversation.tokens_count}</TableCell>
                <TableCell>
                  <Text>{formatDatetime(conversation.first_active_at)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatDatetime(conversation.last_active_at)}</Text>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  <Button
                    variant="light"
                    onClick={() => handleView(conversation)}
                  >
                    查看
                  </Button>
                  <Button
                    variant="light"
                    className="text-red-500"
                    onClick={() => handleDelete(conversation)}
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
        open={showDetailModal}
        onOpenChange={(v: boolean) => setShowDetailModal(v)}
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>编辑</DialogTitle>
          </DialogHeader>
          {JSON.stringify(selectedConversation)}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
