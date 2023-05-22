import { Payment } from '@/api/payments';
import { Badge } from '@tremor/react';

export default function PaymentState({ payment }: { payment: Payment }) {
  const states = {
    pending: { label: '待支付', color: 'slate' },
    paid: { label: '已支付', color: 'green' },
    expired: { label: '已过期', color: 'red' }
  };

  const state = states[payment.state];

  return (
    <Badge size="xs" color={state.color}>
      {state.label}
    </Badge>
  );
}
