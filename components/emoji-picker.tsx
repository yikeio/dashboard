import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface EmojiProps {
  native: string;
}

export default function EmojiPicker(props: {
  children?: React.ReactNode;
  onSelect: (emoji: { native: string }) => void;
}) {
  const handleChange = (emoji: EmojiProps) => {
    props.onSelect(emoji);
  };

  const trigger = props.children || <Button variant={'outline'}>请选择</Button>;

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-none rounded-xl overflow-hidden">
          <Picker data={emojiData} onEmojiSelect={handleChange} />
        </PopoverContent>
      </Popover>
    </>
  );
}
