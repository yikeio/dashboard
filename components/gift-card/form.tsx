import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import GiftCardApi, { GiftCard } from '@/api/gift-cards';
import { formatDatetime } from '@/lib/utils';
import dayjs from 'dayjs';

export interface GiftCardProps {
  giftCard?: GiftCard | null;
  onSaved?: (giftCard?: GiftCard) => void;
  onCancel?: () => void;
}

export default function GiftCardForm(props: GiftCardProps) {
  const [giftCard, setGiftCard] = useState<GiftCard>(
    props.giftCard || {
      name: '',
      code: '',
      tokens_count: 0,
      days: 7,
      state: 'pending',
      expired_at: formatDatetime(dayjs().add(7, 'day').toString())
    }
  );

  const updateValue = (key: string, value: string) => {
    setGiftCard((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (giftCard.id) {
      await GiftCardApi.update(giftCard.id, giftCard);
    } else {
      await GiftCardApi.create(giftCard);
    }

    props.onSaved?.(giftCard);

    toast.success('已保存');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">名称</label>
          <Input
            value={giftCard.name}
            onChange={(e) => updateValue('name', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">tokens 数</label>
          <Input
            value={giftCard.tokens_count}
            onChange={(e) => updateValue('tokens_count', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">有效天数（days）</label>
          <Input
            value={giftCard.days}
            onChange={(e) => updateValue('days', e.target.value)}
          />
        </div>
        <div>todo: 过期时间</div>
      </div>
      <div className="flex gap-2 items-center justify-end mt-4">
        <Button onClick={handleSave}>保存</Button>
        <Button variant="secondary">取消</Button>
      </div>
    </div>
  );
}
