import { Button } from '@/components/ui/button';
import { Textarea } from './ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import EmojiPicker from '@/components/emoji-picker';
import classNames from 'classnames';
import { toast } from 'react-hot-toast';
import userApi, { User } from '@/api/users';

export interface UserProps {
  user: User;
  onSaved?: (user?: User) => void;
  onCancel?: () => void;
}

export default function UserForm(props: UserProps) {
  const [user, setuser] = useState<User>(props.user);

  const updateValue = (key: string, value: string) => {
    setuser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await userApi.update(user.id, user);

    props.onSaved?.(user);

    toast.success('已保存');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">名称</label>
          <Input
            value={user.name}
            onChange={(e) => updateValue('name', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">手机号码</label>
          <Input
            value={user.phone_number}
            onChange={(e) => updateValue('description', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="logo">头像</label>
          <div className="flex items-center justify-between gap-6 rounded-lg border py-2 px-4">
            <div>
              <span className={classNames({ 'text-4xl': user.avatar })}>
                {user.avatar || '未设置'}
              </span>
            </div>
            <EmojiPicker
              onSelect={(emoji: { native: string }) =>
                updateValue('logo', emoji.native)
              }
            ></EmojiPicker>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end mt-4">
        <Button onClick={handleSave}>保存</Button>
        <Button variant="secondary">取消</Button>
      </div>
    </div>
  );
}
