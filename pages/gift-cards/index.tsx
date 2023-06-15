import GiftCardApi, { GiftCard } from '@/api/gift-cards';
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
  Title
} from '@tremor/react';
import { GiftIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import GiftCardForm from '../../components/gift-card/form';
import GiftCardState from '../../components/gift-card/state';

export default function GiftCardPage() {
  const router = useRouter();
  const { data, error, mutate, isLoading } = useSWR(
    [`gift-cards`, router.query.page],
    ([_, page]) => GiftCardApi.list(parseInt((page as string) || '1'))
  );
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<GiftCard | null>(
    null
  );

  const handleEdit = (giftCard: GiftCard) => {
    setSelectedGiftCard(giftCard);
    setShowFormModal(true);
  };

  const handleDelete = async (giftCard: GiftCard) => {
    if (!confirm(`确定要删除 ${giftCard.name} 吗？`)) {
      return;
    }

    await GiftCardApi.delete(giftCard.id!);
    mutate();
    toast.success('已删除');
  };

  const handleFormSaved = (giftCard?: GiftCard) => {
    mutate();
    setShowFormModal(false);
  };

  const handleNew = () => {
    setShowFormModal(true);
  };

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-end gap-4 leading-none">
          <Title className="leading-none flex items-center gap-2">
            <GiftIcon size={24} />
            <span>礼品卡</span>
          </Title>
          <div className="text-muted-foreground">
            <small>共 {data?.total || 0} 条记录</small>
          </div>
        </div>
        <div>
          <Button
            size="sm"
            className="flex items-center justify-center gap-2"
            onClick={handleNew}
          >
            <PlusIcon size={16} /> <span>新建</span>
          </Button>
        </div>
      </div>
      <div className="rounded-lg border dark:bg-muted px-6 py-4 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-28">ID</TableHeaderCell>
              <TableHeaderCell>名称</TableHeaderCell>
              <TableHeaderCell>code</TableHeaderCell>
              <TableHeaderCell>tokens_count</TableHeaderCell>
              <TableHeaderCell>days</TableHeaderCell>
              <TableHeaderCell className="text-center">状态</TableHeaderCell>
              <TableHeaderCell>使用者</TableHeaderCell>
              <TableHeaderCell className="text-center">
                使用时间
              </TableHeaderCell>
              <TableHeaderCell className="text-center">
                过期时间
              </TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((giftCard: GiftCard) => (
              <TableRow key={giftCard.id}>
                <TableCell>{giftCard.id}</TableCell>
                <TableCell>{giftCard.name}</TableCell>
                <TableCell>{giftCard.code}</TableCell>
                <TableCell>{giftCard.tokens_count}</TableCell>
                <TableCell>{giftCard.days}</TableCell>
                <TableCell className="text-center">
                  <GiftCardState giftCard={giftCard} />
                </TableCell>
                <TableCell>
                  {giftCard.user ? (
                    <UserCell user={giftCard.user}></UserCell>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {giftCard.used_at ? formatDatetime(giftCard.used_at) : '--'}
                </TableCell>
                <TableCell className="text-center">
                  {formatDatetime(giftCard.expired_at)}
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5"
                    onClick={() => handleEdit(giftCard)}
                  >
                    编辑
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5 text-red-500"
                    onClick={() => handleDelete(giftCard)}
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
        open={showFormModal}
        onOpenChange={(v: boolean) => setShowFormModal(v)}
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>编辑</DialogTitle>
          </DialogHeader>
          <GiftCardForm
            giftCard={selectedGiftCard}
            onSaved={handleFormSaved}
            onCancel={() => setShowFormModal(false)}
          ></GiftCardForm>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
