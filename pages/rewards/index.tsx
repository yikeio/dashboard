import RewardApi, { Reward } from '@/api/rewards';
import Loading from '@/components/loading';
import RewardState from '@/components/rewards/state';
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

export default function RewardPage() {
  const router = useRouter();
  const { data, error, mutate, isLoading } = useSWR(
    [`rewards`, router.query.page],
    ([_, page]) => RewardApi.list(parseInt((page as string) || '1'))
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReward, setSelectedReward] =
    useState<Reward | null>(null);

  const handleView = (reward: Reward) => {
    setSelectedReward(reward);
    setShowDetailModal(true);
  };

  const handleDelete = async (reward: Reward) => {
    if (!confirm(`确定要删除 ${reward.id} 吗？`)) {
      return;
    }

    await RewardApi.delete(reward.id!);
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
      <div className="rounded-lg border dark:bg-muted px-6 py-4 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-28">ID</TableHeaderCell>
              <TableHeaderCell>用户</TableHeaderCell>
              <TableHeaderCell>来自用户</TableHeaderCell>
              <TableHeaderCell>金额</TableHeaderCell>
              <TableHeaderCell>订单金额</TableHeaderCell>
              <TableHeaderCell>状态</TableHeaderCell>
              <TableHeaderCell>提现时间</TableHeaderCell>
              <TableHeaderCell>创建时间</TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((reward: Reward) => (
              <TableRow key={reward.id}>
                <TableCell>{reward.id}</TableCell>
                <TableCell>
                  <UserCell user={reward.user} />
                </TableCell>
                <TableCell>
                  <UserCell user={reward.from_user} />
                </TableCell>
                <TableCell>+￥{reward.amount || '-'}</TableCell>
                <TableCell>￥{reward.payment?.amount || 0}</TableCell>
                <TableCell>
                  <RewardState reward={reward} />
                </TableCell>
                <TableCell>
                  <Text>
                    {reward.withdrawn_at
                      ? formatDatetime(reward.withdrawn_at)
                      : '-'}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {formatDatetime(reward.created_at)}
                  </Text>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  {/* <Button
                    variant="link"
                    size="sm"
                    className="h-5"
                    onClick={() => handleView(reward)}
                  >
                    查看
                  </Button> */}
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5 text-red-500"
                    onClick={() => handleDelete(reward)}
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
          {JSON.stringify(selectedReward)}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
