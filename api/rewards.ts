import Request from '@/lib/request';
import { Payment } from './payments';
import { User } from './users';

export interface Reward {
    id: number;
    user_id: number;
    user: User;
    from_user_id: number;
    from_user: User;
    payment_id: string;
    payment: Payment;
    amount: string;
    state: 'unwithdrawn' | 'withdrawn';
    rate: number;
    withdrawn_at?: string;
    created_at: string;
    updated_at: string;
}

export default class RewardApi {
    static list(page = 1) {
        return Request.getJson(`rewards?page=${page}`);
    }

    static delete(id: number) {
        return Request.deleteJson(`rewards/${id}`);
    }
}
