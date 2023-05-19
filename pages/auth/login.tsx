import { getAuthRedirectUrl } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';
import Image from 'next/image';

export default function OauthLogin() {
  const authUrl = getAuthRedirectUrl();

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white mb-[20vh] w-72 p-6 border border-gray-300 rounded-lg shadow flex flex-col gap-6 items-center justify-center">
        <div className="flex items-center justify-center">
          <Image src="/logo.svg" alt="" height={80} width={80} />
        </div>
        <h1 className="text-center text-2xl">欢迎回来</h1>

        <Button
          className="w-full"
          size="sm"
          onClick={() => handleRedirect(authUrl)}
        >
          <GithubIcon className="mr-2 h-5 w-5" /> <span>使用 GitHub 登录</span>
        </Button>
      </div>
    </div>
  );
}
