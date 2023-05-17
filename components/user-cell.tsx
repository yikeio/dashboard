import { User } from '@/api/users';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function UserCell(props: { user: User }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-5 w-5">
        <AvatarFallback>
          {props.user.avatar || props.user.name.substring(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div>{props.user.name}</div>
    </div>
  );
}
