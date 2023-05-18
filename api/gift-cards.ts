import { request } from '@/lib/request';
import { User } from './users';

export interface GiftCard {
  id?: number;
  name: string;
  code: string;
  user_id?: number;
  user?: User;
  used_at?: string;
  expired_at: string;
  tokens_count: number;
  days: number;
  state: 'used' | 'expired' | 'pending';
}

export default class GiftCardApi {
  static list(page = 1) {
    return request(`gift-cards?page=${page}`);
  }

  static create(giftCard: GiftCard): Promise<GiftCard> {
    return request(`gift-cards`, {
      method: 'POST',
      body: JSON.stringify(giftCard)
    });
  }

  static update(id: number, giftCard: GiftCard): Promise<GiftCard> {
    return request(`gift-cards/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(giftCard)
    });
  }

  static delete(id: number) {
    return request(`gift-cards/${id}`, {
      method: 'DELETE'
    });
  }
}
