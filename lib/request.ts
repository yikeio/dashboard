import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export const API_DOMAIN = process.env.NEXT_PUBLIC_API_ADMIN_BASE_URI;

export default class Request {
  static get(url: string, options: Record<string, any> = {}) {
    return Request.request(url, options);
  }

  static post(
    url: string,
    data: Record<string, any> = [],
    options: Record<string, any> = {}
  ) {
    return Request.request(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    });
  }

  static patch(
    url: string,
    data: Record<string, any>,
    options: Record<string, any> = {}
  ) {
    return Request.request(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options
    });
  }

  static put(
    url: string,
    data: Record<string, any>,
    options: Record<string, any> = {}
  ) {
    return Request.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  static delete(url: string, options: Record<string, any> = {}) {
    return Request.request(url, {
      method: 'DELETE',
      ...options
    });
  }

  static getJson(url: string, options: Record<string, any> = {}) {
    return Request.get(url, options).then(this.toJson);
  }

  static postJson(
    url: string,
    data: Record<string, any> = [],
    options: Record<string, any> = {}
  ) {
    return Request.post(url, data, options).then(this.toJson);
  }

  static patchJson(
    url: string,
    data: Record<string, any>,
    options: Record<string, any> = {}
  ) {
    return Request.patch(url, data, options).then(this.toJson);
  }

  static putJson(
    url: string,
    data: Record<string, any>,
    options: Record<string, any> = {}
  ) {
    return Request.put(url, data, options).then(this.toJson);
  }

  static deleteJson(url: string, options: Record<string, any> = {}) {
    return Request.delete(url, options).then(this.toJson);
  }

  private static toJson(res: Response) {
    if (res.status == 204) {
      return res.text();
    }

    return res.json();
  }

  static request(url: string, options: Record<string, any> = {}) {
    const token = Cookies.get('dashboard.auth.token');

    options.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    return new Promise<any>((resolve, reject) => {
      return fetch(`${API_DOMAIN}/${url}`, options)
        .then((response: any) => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response);
          }

          if (response.status === 401) {
            Cookies.remove('dashboard.auth.token');
            toast.error('请登录', { id: 'auth.login' });
          }

          if (response.status > 401) {
            response.json().then((result: any) => {
              toast.error(result.message);
              reject(result);
            });
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('网络错误', { id: 'network.error' });
          reject({ result: '网络错误', status: 500 });
        });
    });
  }
}
