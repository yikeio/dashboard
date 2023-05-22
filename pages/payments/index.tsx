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
import paymentApi, { Payment } from '@/api/payments';
import Loading from '@/components/loading';
import { toast } from 'react-hot-toast';
import { formatDatetime, pagginationHandler } from '@/lib/utils';
import UserCell from '@/components/user-cell';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import PaymentState from '../../components/payment/state';
import { Button } from '@/components/ui/button';
import { CreditCardIcon } from 'lucide-react';
import PaymentDetails from '@/components/payment/details';

export default function PaymentPage() {
  const router = useRouter();
  const { data, error, mutate, isLoading } = useSWR(`payments`, () =>
    paymentApi.list(parseInt((router.query.page as string) || '1'))
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

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-end gap-4 leading-none">
          <Title className="leading-none flex items-center gap-2">
            <CreditCardIcon size={24} />
            <span>订单</span>
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
              <TableHeaderCell className="text-center w-28">
                订单号
              </TableHeaderCell>
              <TableHeaderCell className="text-right">金额</TableHeaderCell>
              <TableHeaderCell className="text-center">
                支付时间
              </TableHeaderCell>
              <TableHeaderCell className="text-center">状态</TableHeaderCell>
              <TableHeaderCell className="text-center">
                创建时间
              </TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((payment: Payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <UserCell user={payment.creator} />
                </TableCell>
                <TableCell className="text-center">{payment.number}</TableCell>
                <TableCell className="text-right">
                  <Text>￥{payment.amount}</Text>
                </TableCell>
                <TableCell className="text-center">
                  <Text>{payment.paid_at || '--'}</Text>
                </TableCell>
                <TableCell className="text-center">
                  <PaymentState payment={payment} />
                </TableCell>
                <TableCell className="text-center">
                  {formatDatetime(payment.created_at)}
                </TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5"
                    onClick={() => handleView(payment)}
                  >
                    查看
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5 text-red-500"
                    onClick={() => handleDelete(payment)}
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
            <DialogTitle>订单详情</DialogTitle>
          </DialogHeader>
          <PaymentDetails payment={selectedPayment!} />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
