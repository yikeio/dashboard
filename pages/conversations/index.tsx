import ConversationApi, { Conversation } from '@/api/conversations';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import UserCell from '@/components/user-cell';
import { formatDatetime, pagginationHandler } from '@/lib/utils';
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
import { MessageSquareIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';

export default function ConversationPage() {
  const router = useRouter();
  const { data, error, mutate, isLoading } = useSWR(
    [`conversations`, router.query.page],
    ([_, page]) => ConversationApi.list(parseInt((page as string) || '1'))
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

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-end gap-4 leading-none">
          <Title className="leading-none flex items-center gap-2">
            <MessageSquareIcon size={24} />
            <span>对话</span>
          </Title>
          <div className="text-muted-foreground">
            <small>共 {data?.total || 0} 条记录</small>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-muted px-6 py-4 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-28">ID</TableHeaderCell>
              <TableHeaderCell>用户</TableHeaderCell>
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
                  <Text>
                    {conversation.first_active_at
                      ? formatDatetime(conversation.first_active_at)
                      : '-'}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {conversation.last_active_at
                      ? formatDatetime(conversation.last_active_at)
                      : '-'}
                  </Text>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  {/* <Button
                    variant="link"
                    size="sm"
                    className="h-5"
                    onClick={() => handleView(conversation)}
                  >
                    查看
                  </Button> */}
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5 text-red-500"
                    onClick={() => handleDelete(conversation)}
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
