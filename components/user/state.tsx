import { User } from '@/api/users';
import { Badge, Color } from '@tremor/react';

export default function UserState({ user }: { user: User }) {
  const states = {
    unactivated: {
      label: '未激活',
      color: 'slate'
    },
    activated: { label: '已激活', color: 'green' },
    banned: { label: '已封禁', color: 'red' }
  };

  const state = states[user.state];

  return (
    <Badge size="xs" color={state.color as Color}>
      {state.label}
    </Badge>
  );
}
