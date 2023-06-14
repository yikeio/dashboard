import Request from '@/lib/request';
import { User } from './users';

export interface Conversation {
  id: number;
  creator_id: number;
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
    return Request.getJson(`conversations?page=${page}`);
  }

  static delete(id: number) {
    return Request.deleteJson(`conversations/${id}`);
  }
}
