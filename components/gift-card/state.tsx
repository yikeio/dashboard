import { GiftCard } from '@/api/gift-cards';
import { Badge } from '@tremor/react';

export default function GiftCardState({ giftCard }: { giftCard: GiftCard }) {
  const states = {
    pending: { label: '未使用', color: 'slate' },
    used: { label: '已使用', color: 'green' },
    expired: { label: '已过期', color: 'red' }
  };

  const state = states[giftCard.state];

  return (
    <Badge size="xs" color={state.color}>
      {state.label}
    </Badge>
  );
}
