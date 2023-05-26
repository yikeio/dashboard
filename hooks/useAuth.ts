import { useEffect, useState } from 'react';
import { Token, getToken } from '@/api/auth';
import UserApi, { User } from '@/api/users';
import Cookies from 'js-cookie';

export default function useAuth() {
  const AUTH_TOKEN_KEY = 'auth.token';
  const AUTH_USER_KEY = 'auth.user';

  let [user, setUser] = useState<User>();
  let [hasLogged, setHasLogged] = useState(!!Cookies.get(AUTH_TOKEN_KEY));

  const redirectToLogin = () => {
    window.location.href = '/auth/login';
  };

  const userHasLogged = () => {
    return !!Cookies.get(AUTH_TOKEN_KEY);
  };

  const getUser = async (): Promise<User | undefined> => {
    if (!userHasLogged()) {
      return undefined;
    }

    const cache = localStorage.getItem(AUTH_USER_KEY);

    if (!cache) {
      await refreshAuthUser();
    } else {
      setUser(JSON.parse(cache));
    }

    return user;
  };

  const refreshAuthUser = async (): Promise<User> => {
    const res = await UserApi.getAuthUser();

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res));
    setUser(res);

    return user as User;
  };

  const handleOauthCallback = async (
    code: string,
    state: string
  ): Promise<User> => {
    const token = await getToken(code, state);

    if (!token.value) {
      throw new Error(JSON.stringify(token));
    }

    saveToken(token);

    return await refreshAuthUser();
  };

  const saveToken = (token: { value: string; expires_at: string }): Token => {
    Cookies.set(AUTH_TOKEN_KEY, token.value, {
      expires: new Date(token.expires_at)
    });

    return token;
  };

  const logout = () => {
    Cookies.remove(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(undefined);
  };

  useEffect(() => {
    getUser();
    setHasLogged(userHasLogged());
  }, []);

  return {
    hasLogged,
    user,
    logout,
    redirectToLogin,
    handleOauthCallback,
    refreshAuthUser
  };
}
