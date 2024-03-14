import { cn } from '@/utils/style';
import { ReactNode } from 'react';

interface SelectLineProps {
  icon?: ReactNode;
  context: string;
  className?: string;
  onClick: () => void;
}

const SelectLine: React.FC<SelectLineProps> = ({
  icon,
  context,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'cursor-pointer',
        'flex items-center gap-2',
        'transition-opacity ease-in-out hover:opacity-70',
        className
      )}
      onClick={onClick}
    >
      {icon && <div className="text-xl">{icon}</div>}
      <p className="text-base">{context}</p>
    </div>
  );
};

export default SelectLine;
