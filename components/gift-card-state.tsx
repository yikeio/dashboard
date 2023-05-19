import { GiftCard } from '@/api/gift-cards';
import classNames from 'classnames';

export default function GiftCardState({ giftCard }: { giftCard: GiftCard }) {
  const states = {
    pending: { label: '未使用', color: 'bg-orange-100 text-orange-700' },
    used: { label: '已使用', color: 'bg-green-100 text-green-700' },
    expired: { label: '已过期', color: 'bg-red-100 text-red-700' }
  };

  const state = states[giftCard.state];

  return (
    <span className={classNames('rounded-full px-2 py-1 text-xs', state.color)}>
      {state.label}
    </span>
  );
}
