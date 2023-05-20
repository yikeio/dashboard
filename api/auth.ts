/**
 * 获取跳转地址
 * @returns
 */
export function getAuthRedirectUrl(driver: string = 'dashboard') {
  return `${process.env.NEXT_PUBLIC_API_BASE_URI}/auth/redirect?driver=${driver}`;
}

export async function getToken(
  code: string,
  state: string
): Promise<Record<string, any>> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/auth/tokens:via-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code, state })
  }).then((res) => res.json());
}
