import { User } from '@/api/users';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import UserCell from '../user-cell';
import { Badge } from '@tremor/react';
import UserState from './state';
import { formatDatetime } from '@/lib/utils';
import DetailItem from '../detail-item';

export default function UserDetails({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-28 w-28">
          {user.avatar && <AvatarImage src={user.avatar} />}
          <AvatarFallback>
            <span className="text-gray-700 text-4xl">
              {user.name.substring(0, 1)}
            </span>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-2">
          <div>{user.name}</div>
          <div className="flex items-center gap-2">
            {user.is_admin && (
              <Badge size="xs" color="green">
                管理员
              </Badge>
            )}
            <UserState user={user} />
          </div>
        </div>
      </div>
      <DetailItem label="手机号">{user.phone_number || '-'}</DetailItem>
      <DetailItem label="Email">{user.email || '-'}</DetailItem>
      <DetailItem label="邀请者">
        {user.referrer ? <UserCell user={user.referrer}></UserCell> : '-'}
      </DetailItem>
      <DetailItem label="邀请码">{user.referral_code}</DetailItem>
      <DetailItem label="支付总额">￥{user.paid_total}</DetailItem>
      <DetailItem label="邀请人数">{user.referrals_count} 人</DetailItem>
      <DetailItem label="邀请层级">{user.level}</DetailItem>
      <DetailItem label="首次使用">
        {user.first_active_at ? formatDatetime(user.first_active_at) : '-'}
      </DetailItem>
      <DetailItem label="最后使用">
        {user.last_active_at ? formatDatetime(user.last_active_at) : '-'}
      </DetailItem>
    </div>
  );
}
