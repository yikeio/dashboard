import { getToken } from '@/api/auth';
import Cookies from 'js-cookie';

export default function useAuth() {
  const login = () => {
    window.location.replace('/auth/login');
  };

  const handleCallback = async (code: string, state: string) => {
    const token = await getToken(code, state);

    console.log('auth result:', token);

    if (!token.value) {
      throw new Error(JSON.stringify(token));
    }

    Cookies.set('auth.token', token.value, {
      expires: new Date(token.expires_at)
    });

    return token;
  };

  const logout = () => {
    Cookies.remove('auth.token');
  };

  return { login, logout, handleCallback };
}
