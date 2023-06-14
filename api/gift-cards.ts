import Request from '@/lib/request';
import { User } from './users';

export interface GiftCard {
  id: number;
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
    return Request.getJson(`gift-cards?page=${page}`);
  }

  static create(giftCard: GiftCard): Promise<GiftCard> {
    return Request.postJson(`gift-cards`, giftCard);
  }

  static update(id: number, giftCard: GiftCard): Promise<GiftCard> {
    return Request.patchJson(`gift-cards/${id}`, giftCard);
  }

  static delete(id: number) {
    return Request.deleteJson(`gift-cards/${id}`);
  }
}
