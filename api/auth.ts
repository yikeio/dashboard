import { request } from '@/lib/request';

/**
 * 获取跳转地址
 * @returns
 */
export function redirectToAuthProvider(driver: string) {
  return `${process.env.NEXT_PUBLIC_API_BASE_URI}/api/auth/redirect?driver=${driver}`;
}

/**
 * 创建authToken
 */
export async function createTokens(data: any) {
  return request(`auth/tokens:via-code`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
