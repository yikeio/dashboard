import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import EmojiPicker from '@/components/emoji-picker';
import classNames from 'classnames';
import { request } from '@/lib/request';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import PromptApi, { Prompt } from '@/api/prompts';

export interface PromptProps {
  prompt?: Prompt | null;
  onSaved?: (prompt?: Prompt) => void;
  onCancel?: () => void;
}

export default function PromptForm(props: PromptProps) {
  const [prompt, setPrompt] = useState<Prompt>(
    props.prompt || { name: '', sort_order: 0 }
  );

  const updateValue = (key: string, value: string) => {
    setPrompt((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (prompt.id) {
      await PromptApi.update(prompt.id, prompt);
    } else {
      await PromptApi.create(prompt);
    }

    props.onSaved?.(prompt);

    toast.success('已保存');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">名称</label>
            <Input
              value={prompt.name}
              onChange={(e) => updateValue('name', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">描述</label>
            <Input
              value={prompt.description}
              onChange={(e) => updateValue('description', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="logo">图标</label>
            <div className="flex items-center justify-between gap-6 rounded-lg border py-2 px-4">
              <div>
                <span className={classNames({ 'text-4xl': prompt.logo })}>
                  {prompt.logo || '未设置'}
                </span>
              </div>
              <EmojiPicker
                onSelect={(emoji: { native: string }) =>
                  updateValue('logo', emoji.native)
                }
              ></EmojiPicker>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="prompt_en">权重</label>
              <Input
                min={0}
                type="number"
                maxLength={4}
                value={prompt.sort_order}
                onChange={(e) => updateValue('sort_order', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="prompt_cn">提示词（中文）</label>
            <Textarea
              className="h-32"
              value={prompt.prompt_cn}
              onChange={(e) => updateValue('prompt_cn', e.target.value)}
              placeholder="你是一个xxxx"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="prompt_en">提示词（English）</label>
            <Textarea
              className="h-32"
              value={prompt.prompt_en}
              onChange={(e) => updateValue('prompt_en', e.target.value)}
              placeholder="你是一个xxxx"
            />
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
