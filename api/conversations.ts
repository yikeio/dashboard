import { request } from '@/lib/request';
import { User } from './users';

export interface Conversation {
  id: number;
  creator_id: string;
  creator: User;
  title: string;
  messages_count: number;
  tokens_count: number;
  first_active_at?: string;
  last_active_at?: string;
  created_at: string;
  updated_at: string;
}

export default class ConversationApi {
  static list(page = 1) {
    return request(`conversations?page=${page}`);
  }

  static delete(id: number) {
    return request(`conversations/${id}`, {
      method: 'DELETE'
    });
  }
}
