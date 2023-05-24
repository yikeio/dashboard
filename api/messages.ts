import { request } from '@/lib/request';
import { User } from './users';
import { Conversation } from './conversations';

export interface Message {
  id: number;
  quota_id: number;
  creator_id: number;
  creator: User;
  conversation_id: number;
  conversation: Conversation;
  role: string;
  content: string;
  tokens_count: number;
  first_active_at?: string;
  last_active_at?: string;
  created_at: string;
  updated_at: string;
}

export default class MessageApi {
  static list(page = 1) {
    return request(`messages?page=${page}`);
  }

  static delete(id: number) {
    return request(`messages/${id}`, {
      method: 'DELETE'
    });
  }
}
