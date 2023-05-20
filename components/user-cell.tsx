import { User } from '@/api/users';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import classNames from 'classnames';

export default function UserCell(props: { user: User }) {
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
      props.user.id % fallbackAvatarBackgroundColors.length
    ];

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-5 w-5">
        {props.user.avatar && <AvatarImage src={props.user.avatar} />}
        <AvatarFallback className={classNames(fallbackAvatarBackgroundColor)}>
          <span className="text-white text-sm">
            {props.user.name.substring(0, 1)}
          </span>
        </AvatarFallback>
      </Avatar>
      <div>{props.user.name}</div>
    </div>
  );
}
