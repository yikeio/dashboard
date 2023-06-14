import Request from '@/lib/request';

export default class StatsApi {
  static get() {
    return Request.getJson(`stats`);
  }
}
