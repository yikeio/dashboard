import { request } from '@/lib/request';

export interface Prompt {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  greeting: string;
  prompt_cn?: string;
  prompt_en?: string;
  sort_order: number;
}

export default class PromptApi {
  static list(page = 1) {
    return request(`prompts?page=${page}`);
  }

  static create(prompt: Prompt): Promise<Prompt> {
    return request(`prompts`, {
      method: 'POST',
      body: JSON.stringify(prompt)
    });
  }

  static update(id: number, prompt: Prompt): Promise<Prompt> {
    return request(`prompts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(prompt)
    });
  }

  static delete(id: number) {
    return request(`prompts/${id}`, {
      method: 'DELETE'
    });
  }
}
