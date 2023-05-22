import { Payment } from '@/api/payments';
import { Badge } from '@tremor/react';
import PaymentState from './state';
import { formatDatetime } from '@/lib/utils';
import DetailItem from '../detail-item';
import UserCell from '../user-cell';

export default function PaymentDetails({ payment }: { payment: Payment }) {
  return (
    <div className="flex flex-col gap-4">
      <DetailItem label="标题">{payment.title}</DetailItem>

      <DetailItem label="订单号">{payment.number}</DetailItem>
      <DetailItem label="订单ID">{payment.id}</DetailItem>
      <DetailItem label="总额">￥{payment.amount}</DetailItem>
      <DetailItem label="状态">
        <PaymentState payment={payment}></PaymentState>
      </DetailItem>
      <DetailItem label="用户">
        <UserCell user={payment.creator}></UserCell>
      </DetailItem>
      <DetailItem label="网关">{payment.gateway}</DetailItem>
      <DetailItem label="创建时间">
        {formatDatetime(payment.created_at)}
      </DetailItem>
      <DetailItem label="支付时间">
        {payment.paid_at ? formatDatetime(payment.paid_at) : '-'}
      </DetailItem>
    </div>
  );
}
