import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from 'react';
import { Button } from './ui/button';
import classNames from 'classnames';

interface EmojiProps {
  native: string;
}

export default function EmojiPicker(props: {
  children?: React.ReactNode;
  onSelect: (emoji: { native: string }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (emoji: EmojiProps) => {
    props.onSelect(emoji);
    setIsOpen(false);
  };

  const trigger = props.children || <Button variant={'outline'}>请选择</Button>;

  return (
    <a className="cursor-default relative" onClick={() => setIsOpen(!isOpen)}>
      {trigger}
      <div className={classNames('absolute top-[100%]', { hidden: !isOpen })}>
        <Picker data={emojiData} onEmojiSelect={handleChange} />
      </div>
    </a>
  );
}
