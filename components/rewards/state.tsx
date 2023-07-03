import { Reward } from '@/api/rewards';
import { Badge, Color } from '@tremor/react';

export default function RewardState({ reward }: { reward: Reward }) {
    const states = {
        unwithdrawn: { label: '未提现', color: 'slate' },
        withdrawn: { label: '已提现', color: 'green' },
    };

    const state = states[reward.state];

    return (
        <Badge size="xs" color={state.color as Color}>
            {state.label}
        </Badge>
    );
}
