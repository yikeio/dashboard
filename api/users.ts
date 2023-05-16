import { request } from '@/lib/request';

export interface User {
  id: number;
  name: string;
  avatar?: string;
  root_referrer_id?: number;
  referrer_id?: number;
  level?: number;
  referrer_path?: string;
  referral_code?: string;
  referrals_count?: number;
  phone_number?: string;
  is_admin?: boolean;
  first_active_at?: string;
  last_active_at?: string;
  state?: string;
  referrer?: User;
  paid_total?: string;
  created_at?: string;
  updated_at?: string;
}

export default class UserApi {
  static list() {
    return request(`users`);
  }

  static update(id: number, user: User): Promise<User> {
    return request(`users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user)
    });
  }

  static delete(id: number) {
    return request(`users/${id}`, {
      method: 'DELETE'
    });
  }
}
