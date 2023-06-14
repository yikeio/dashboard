import { Token, getToken } from '@/api/auth';
import UserApi, { User } from '@/api/users';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useAuth() {
  const AUTH_TOKEN_KEY = 'dashboard.auth.token';
  const AUTH_USER_KEY = 'dashboard.auth.user';

  const [token, setToken] = useState<string | null>(
    Cookies.get(AUTH_TOKEN_KEY) as string
  );
  let [hasLogged, setHasLogged] = useState(!!Cookies.get(AUTH_TOKEN_KEY));

  const {
    data: user,
    isLoading,
    mutate
  } = useSWR([token], ([token]) => (token ? UserApi.getAuthUser() : null));

  const redirectToLogin = () => {
    window.location.href = '/auth/login';
  };

  const handleOauthCallback = async (
    code: string,
    state: string
  ): Promise<User | null | undefined> => {
    const token = await getToken(code, state);

    if (!token.value) {
      throw new Error(JSON.stringify(token));
    }

    saveToken(token);
    console.log(token);

    return await mutate();
  };

  const saveToken = (token: Token): Token => {
    Cookies.set(AUTH_TOKEN_KEY, token.value, {
      expires: new Date(token.expires_at)
    });

    setHasLogged(true);

    setToken(token.value);

    return token;
  };

  const logout = () => {
    Cookies.remove(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setToken(null);
  };

  useEffect(() => {
    setHasLogged(!!token);
  }, [token]);

  return {
    hasLogged,
    user,
    logout,
    isLoading,
    redirectToLogin,
    handleOauthCallback,
    refreshAuthUser: mutate,
    authToken: token
  };
}
