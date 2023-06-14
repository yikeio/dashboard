import Request from '@/lib/request';

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
    return Request.getJson(`prompts?page=${page}`);
  }

  static create(prompt: Prompt): Promise<Prompt> {
    return Request.postJson(`prompts`, prompt);
  }

  static update(id: number, prompt: Prompt): Promise<Prompt> {
    return Request.patchJson(`prompts/${id}`, prompt);
  }

  static delete(id: number) {
    return Request.deleteJson(`prompts/${id}`);
  }
}
