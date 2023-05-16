import { request } from '@/lib/request';
import { User } from './users';

export interface Payment {
  id: number;
  creator_id: string;
  creator: User;
  title: string;
  amount: string;
  number: string;
  state: string;
  gateway: string;
  gateway_number: string;
  raw?: string;
  processors?: string;
  context?: string;
  paid_at: string;
  expired_at?: string;
  created_at: string;
  updated_at: string;
}

export default class PaymentApi {
  static list() {
    return request(`payments`);
  }

  static delete(id: number) {
    return request(`payments/${id}`, {
      method: 'DELETE'
    });
  }
}
