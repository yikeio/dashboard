import { User } from '@/api/users';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import classNames from 'classnames';
import { Badge } from '@tremor/react';
import { twMerge } from 'tailwind-merge';

export default function UserCell({
  showRole = true,
  className = '',
  user
}: {
  showRole?: boolean;
  className?: string;
  user: User;
}) {
  const fallbackAvatarBackgroundColors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500'
  ];

  const fallbackAvatarBackgroundColor =
    fallbackAvatarBackgroundColors[
      user.id % fallbackAvatarBackgroundColors.length
    ];

  return (
    <div className="flex items-center gap-2">
      <Avatar className={twMerge('h-5 w-5', className)}>
        {user.avatar && <AvatarImage src={user.avatar} />}
        <AvatarFallback className={classNames(fallbackAvatarBackgroundColor)}>
          <span className="text-white text-sm">
            {user.name?.substring(0, 1) || user.id.toString().substring(0, 1)}
          </span>
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2">
        <div>{user.name || user.id}</div>
        {user.is_admin && showRole && (
          <Badge size="xs" color="green">
            管理员
          </Badge>
        )}
      </div>
    </div>
  );
}
