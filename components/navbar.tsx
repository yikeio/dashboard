'use client';

import useAuth from '@/hooks/useAuth';
import classNames from 'classnames';
import {
  CreditCardIcon,
  GiftIcon,
  LayoutGridIcon,
  LogOutIcon,
  MessageSquareIcon,
  TagIcon,
  UserIcon,
  Wand2Icon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import UserCell from './user-cell';

const navigation = [
  { name: '首页', icon: <LayoutGridIcon size={16} />, href: '/' },
  { name: '用户', icon: <UserIcon size={16} />, href: '/users' },
  { name: '订单', icon: <CreditCardIcon size={16} />, href: '/payments' },
  {
    name: '对话',
    icon: <MessageSquareIcon size={16} />,
    href: '/conversations'
  },
  {
    name: '消息',
    icon: <MessageSquareIcon size={16} />,
    href: '/messages'
  },
  { name: '场景', icon: <Wand2Icon size={16} />, href: '/prompts' },
  { name: '礼品卡', icon: <GiftIcon size={16} />, href: '/gift-cards' },
  { name: '奖励', icon: <GiftIcon size={16} />, href: '/rewards' },
  {
    name: '标签',
    icon: <TagIcon size={16} />,
    href: '/tags'
  }
  // { name: '设置', icon: <Settings2Icon size={16} />, href: '/settings' }
];

export default function Navbar() {
  const pathname = usePathname();
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
    window.location.href = '/auth/login';
  };

  return (
    <nav className="bg-background h-screen shadow-sm w-48 xl:w-56 p-4 relative">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-shrink-0 items-center p-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="ml-2 text-xl font-bold">一刻控制台</span>
          </div>
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? ' bg-background text-foreground'
                    : ' text-gray-500 hover:bg-muted hover:text-foreground ',
                  'relative flex gap-2 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        {auth.user && (
          <div className="flex items-center justify-between gap-4 absolute bottom-0 right-0 left-0 pb-4 border-t p-4">
            <UserCell
              user={auth.user}
              showRole={false}
              className="h-8 w-8"
            ></UserCell>
            <Button
              variant={'outline'}
              size={'sm'}
              className=""
              onClick={handleLogout}
            >
              <LogOutIcon size={16} />
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
