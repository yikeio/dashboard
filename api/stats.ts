import { request } from '@/lib/request';

export default class StatsApi {
  static get() {
    return request(`stats`);
  }
}
