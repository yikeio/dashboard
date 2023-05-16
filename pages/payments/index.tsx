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
import paymentApi, { Payment } from '@/api/payments';
import Loading from '@/components/loading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'react-hot-toast';

export default function PaymentPage() {
  const { data, error, mutate, isLoading } = useSWR(
    `payments`,
    paymentApi.list
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const handleDelete = async (payment: Payment) => {
    if (!confirm(`确定要删除 ${payment.title} 吗？`)) {
      return;
    }

    await paymentApi.delete(payment.id!);
    mutate();
    toast.success('已删除');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Title>订单</Title>
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
              <TableHeaderCell>订单号</TableHeaderCell>
              <TableHeaderCell>金额</TableHeaderCell>
              <TableHeaderCell>支付时间</TableHeaderCell>
              <TableHeaderCell>状态</TableHeaderCell>
              <TableHeaderCell>创建时间</TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((payment: Payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="text-3xl">
                      {payment.creator.avatar || ''}
                    </AvatarFallback>
                  </Avatar>
                  <div>{payment.creator.name}</div>
                </TableCell>
                <TableCell>{payment.number}</TableCell>
                <TableCell>
                  <Text>￥{payment.amount}</Text>
                </TableCell>
                <TableCell>
                  <Text>{payment.paid_at}</Text>
                </TableCell>
                <TableCell>
                  <Text>{payment.state}</Text>
                </TableCell>
                <TableCell>
                  <Text>{payment.created_at}</Text>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  <Button variant="light" onClick={() => handleView(payment)}>
                    查看
                  </Button>
                  <Button
                    variant="light"
                    className="text-red-500"
                    onClick={() => handleDelete(payment)}
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
          {selectedPayment}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
