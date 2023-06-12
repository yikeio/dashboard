import TagApi, { Tag } from '@/api/tags';
import EmojiPicker from '@/components/emoji-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import classNames from 'classnames';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export interface TagProps {
  tag?: Tag | null;
  onSaved?: (tag?: Tag) => void;
  onCancel?: () => void;
}

export default function TagForm(props: TagProps) {
  const [tag, setTag] = useState<Tag>(
    props.tag || { id: 0, name: '', sort_order: 0 }
  );

  const updateValue = (key: string, value: string) => {
    setTag((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (tag.id) {
      await TagApi.update(tag.id, tag);
    } else {
      await TagApi.create(tag);
    }

    props.onSaved?.(tag);

    toast.success('已保存');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">名称</label>
          <Input
            value={tag.name}
            onChange={(e) => updateValue('name', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="icon">图标</label>
          <div className="flex items-center justify-between gap-6 rounded-lg border py-2 px-4">
            <div>
              <span className={classNames({ 'text-4xl': tag.icon })}>
                {tag.icon || '未设置'}
              </span>
            </div>
            <EmojiPicker
              onSelect={(emoji: { native: string }) =>
                updateValue('icon', emoji.native)
              }
            ></EmojiPicker>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="sort_order">权重</label>
            <Input
              min={0}
              type="number"
              maxLength={4}
              value={tag.sort_order}
              onChange={(e) => updateValue('sort_order', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end mt-4">
        <Button onClick={handleSave}>保存</Button>
        <Button variant="secondary" onClick={props.onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
}
