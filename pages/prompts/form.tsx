import { Button } from '@/components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import EmojiPicker from '@/components/emoji-picker';
import classNames from 'classnames';

export interface Prompt {
  id?: number;
  name: string;
  logo?: string;
  description?: string;
  prompt_cn?: string;
  prompt_en?: string;
  sort_order: number;
}

export interface PromptProps {
  prompt?: Prompt | null;
}

export default function PromptForm(props: PromptProps) {
  const [prompt, setPrompt] = useState<Prompt>(
    props.prompt || { name: '', sort_order: 0 }
  );

  const updateValue = (key: string, value: string) => {
    setPrompt((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">名称</label>
            <Input value={prompt.name} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">描述</label>
            <Input value={prompt.description} />
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
              placeholder="你是一个xxxx"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="prompt_en">提示词（English）</label>
            <Textarea
              className="h-32"
              value={prompt.prompt_en}
              placeholder="你是一个xxxx"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end mt-4">
        <Button>保存</Button>
        <Button variant="secondary">取消</Button>
      </div>
    </div>
  );
}
