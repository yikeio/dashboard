import { request } from '@/lib/request';

export interface Tag {
  id: number;
  name: string;
  icon?: string;
  sort_order: number | string;
  created_at?: string;
  updated_at?: string;
}

export default class TagApi {
  static list({
    page = 1,
    search = ''
  }: {
    page?: number | string;
    search?: string;
  }) {
    return request(`tags?page=${page}&search=${search}`);
  }

  static create(tag: Tag): Promise<Tag> {
    return request(`tags`, {
      method: 'POST',
      body: JSON.stringify(tag)
    });
  }

  static update(id: number, tag: Tag): Promise<Tag> {
    return request(`tags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(tag)
    });
  }

  static delete(id: number) {
    return request(`tags/${id}`, {
      method: 'DELETE'
    });
  }
}
