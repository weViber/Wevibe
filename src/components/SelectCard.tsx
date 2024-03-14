import { cn } from '@/utils/style';
import { ReactNode } from 'react';

interface SelectCardProps {
  icon?: ReactNode;
  context: string;
  className?: string;
  onClick: () => void;
}

const SelectCard: React.FC<SelectCardProps> = ({
  icon,
  context,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'cursor-pointer shadow-lg',
        'rounded-md border border-slate-200 px-8 py-6',
        'flex flex-col items-center justify-center gap-4',
        'transition-opacity ease-in-out hover:opacity-70',
        className
      )}
      onClick={onClick}
    >
      {icon && <div>{icon}</div>}
      <p className="text-lg font-semibold">{context}</p>
    </div>
  );
};

export default SelectCard;
