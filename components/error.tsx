import classNames from 'classnames';
import { AlertCircle } from 'lucide-react';

export default function Error({
  className = '',
  message = '出错了，请稍后再试。'
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={classNames(
        className,
        'flex flex-col gap-6 items-center justify-center h-full'
      )}
    >
      <AlertCircle size={48} className="text-red-600" />
      <span>{message}</span>
    </div>
  );
}
