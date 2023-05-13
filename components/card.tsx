import { Card as TremorCard } from '@tremor/react';
import Loading from './loading';
import classNames from 'classnames';

export default function Card({
  className,
  children,
  isLoading = false
}: {
  className?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <TremorCard className={classNames('relative min-h-[500px]', className)}>
      {isLoading ? <Loading className="absolute inset-0" /> : children}
    </TremorCard>
  );
}
