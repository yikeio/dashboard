import toast from 'react-hot-toast';
import { trimEnd } from 'lodash';

const API_BASE_URI = trimEnd(process.env.NEXT_PUBLIC_API_BASE_URI, '/');

console.log(API_BASE_URI);

export function request(url: string, options: Record<string, any> = {}) {
  const token = localStorage.getItem('auth.token');

  console.log(API_BASE_URI);

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
        } else {
          res.json().then((result: any) => {
            toast.error(res.status == 401 ? '请登录' : result.message);
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
