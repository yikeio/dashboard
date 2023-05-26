import Loading from '@/components/loading';
import useAuth from '@/hooks/useAuth';
import { CheckIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OauthCallback() {
  const auth = useAuth();
  const query = useSearchParams();
  const [state, setState] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.has('code') && query.has('state')) {
      auth
        .handleOauthCallback(
          query.get('code') as string,
          query.get('state') as string
        )
        .then(() => {
          setState('success');
          window.location.replace('/');
        })
        .catch((error) => {
          setError(error.message);
          console.error(error);
          setState('error');
        });
    }
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white mb-[20vh] w-72 p-6 border text-gray-600 border-gray-300 rounded-lg shadow flex flex-col gap-6 items-center justify-center">
          {state === 'loading' && (
            <>
              <div>登录中...</div>
              <Loading />
            </>
          )}
          {state === 'error' && (
            <>
              <div>登录失败</div>
              <code className="text-red-400 text-xs">
                {error?.substring(0, 500)}
              </code>
            </>
          )}
          {state === 'success' && (
            <>
              <div>登录成功</div>
              <div className="rounded-full flex items-center justify-center p-2 bg-green-600 text-white">
                <CheckIcon size={18} />
              </div>
              <div>正在前往控制台...</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
