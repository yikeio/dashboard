'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import {
  CreditCardIcon,
  GiftIcon,
  LayoutGridIcon,
  MessageSquareIcon,
  Settings2Icon,
  TerminalSquareIcon,
  UserIcon
} from 'lucide-react';
import { Component } from 'react';

const navigation = [
  { name: '首页', icon: <LayoutGridIcon size={16} />, href: '/' },
  { name: '用户', icon: <UserIcon size={16} />, href: '/users' },
  { name: '订单', icon: <CreditCardIcon size={16} />, href: '/payments' },
  {
    name: '对话',
    icon: <MessageSquareIcon size={16} />,
    href: '/conversations'
  },
  { name: '角色', icon: <TerminalSquareIcon size={16} />, href: '/prompts' },
  { name: '礼品卡', icon: <GiftIcon size={16} />, href: '/gift-cards' },
  { name: '设置', icon: <Settings2Icon size={16} />, href: '/settings' }
];

export default function Navbar({ user = null }: { user: any }) {
  const pathname = usePathname();

  return (
    <nav className="bg-white h-screen shadow-sm w-48 xl:w-56 p-4 relative">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-shrink-0 items-center p-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          </div>
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? 'border-slate-500 text-gray-900 border'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
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
        <div className="flex items-center gap-4 absolute bottom-0 right-0 left-0 pb-4 border-t p-4">
          <Image
            className="h-8 w-8 rounded-full"
            src={user?.image || 'https://avatar.vercel.sh/leerob'}
            height={32}
            width={32}
            alt={`${user?.name || 'placeholder'} avatar`}
          />

          <span>{user?.name || '未登录'}</span>
        </div>
      </div>
    </nav>
  );
}
