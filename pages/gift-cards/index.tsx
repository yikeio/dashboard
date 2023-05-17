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
import GiftCardForm from './form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import GiftCardApi, { GiftCard } from '@/api/gift-cards';
import Loading from '@/components/loading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'react-hot-toast';
import { formatDatetime } from '@/lib/utils';
import UserCell from '@/components/user-cell';

export default function GiftCardPage() {
  const { data, error, mutate, isLoading } = useSWR(
    `gift-cards`,
    GiftCardApi.list
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Title>角色</Title>
        <div className="text-gray-500">
          <small>共 {data?.total || 0} 条记录</small>
        </div>
      </div>
      <div className="rounded-lg border bg-white p-6 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>名称</TableHeaderCell>
              <TableHeaderCell>code</TableHeaderCell>
              <TableHeaderCell>tokens_count</TableHeaderCell>
              <TableHeaderCell>days</TableHeaderCell>
              <TableHeaderCell>状态</TableHeaderCell>
              <TableHeaderCell>使用者</TableHeaderCell>
              <TableHeaderCell>使用时间</TableHeaderCell>
              <TableHeaderCell>过期时间</TableHeaderCell>
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
                <TableCell>{}</TableCell>
                <TableCell>
                  {giftCard.user ? (
                    <UserCell user={giftCard.user}></UserCell>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{formatDatetime(giftCard.used_at)}</TableCell>
                <TableCell>{formatDatetime(giftCard.expired_at)}</TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  <Button variant="light" onClick={() => handleEdit(giftCard)}>
                    编辑
                  </Button>
                  <Button
                    variant="light"
                    className="text-red-500"
                    onClick={() => handleDelete(giftCard)}
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
