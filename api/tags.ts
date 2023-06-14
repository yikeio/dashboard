import Request from '@/lib/request';

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
    return Request.getJson(`tags?page=${page}&search=${search}`);
  }

  static create(tag: Tag): Promise<Tag> {
    return Request.postJson(`tags`, tag);
  }

  static update(id: number, tag: Tag): Promise<Tag> {
    return Request.patchJson(`tags/${id}`, tag);
  }

  static delete(id: number) {
    return Request.deleteJson(`tags/${id}`);
  }
}
