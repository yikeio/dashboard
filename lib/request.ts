import toast from 'react-hot-toast';
import { trimEnd } from 'lodash';
import Cookies from 'js-cookie';
import { getAuthRedirectUrl } from '@/api/auth';

const API_BASE_URI = trimEnd(process.env.NEXT_PUBLIC_API_ADMIN_BASE_URI, '/');

export function request(url: string, options: Record<string, any> = {}) {
  const token = Cookies.get('auth.token');

  options.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  return new Promise<any>((resolve, reject) => {
    return fetch(`${API_BASE_URI}/${url}`, options)
      .then((res: any) => {
        if (res.status === 204) {
          return res.text().then((result: any) => {
            resolve(result);
          });
        }

        if (res.status >= 200 && res.status <= 300) {
          res.json().then((result: any) => {
            resolve(result);
          });
        }

        if (res.status === 401) {
          res.json().then((result: any) => {
            Cookies.remove('auth.token');

            toast.error('请登录');

            setTimeout(() => {
              window.location.href = getAuthRedirectUrl();
            }, 1000);

            reject(result);
          });
        }

        if (res.status > 401) {
          res.json().then((result: any) => {
            toast.error(result.message);
            reject(result);
          });
        }
      })
      .catch(() => {
        toast.error('网络错误');
        reject({ result: '网络错误', status: 500 });
      });
  });
}
