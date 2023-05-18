import { Payment } from '@/api/payments';
import classNames from 'classnames';

export default function PaymentState({ payment }: { payment: Payment }) {
  const states = {
    pending: { label: '待支付', color: 'bg-orange-100 text-orange-700' },
    paid: { label: '已支付', color: 'bg-green-100 text-green-700' },
    expired: { label: '已过期', color: 'bg-red-100 text-red-700' }
  };

  const state = states[payment.state];

  return (
    <span className={classNames('rounded-full px-2 py-1 text-xs', state.color)}>
      {state.label}
    </span>
  );
}
