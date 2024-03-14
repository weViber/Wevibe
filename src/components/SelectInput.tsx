import { cn } from '@/utils/style';
import { ReactNode } from 'react';

interface SelectInputProps {
  icon: ReactNode;
  placeholder?: string;
  className?: string;
  inputTrue: boolean;
  value: string;
  onClick: () => void;
  onChange: (text: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  icon,
  placeholder,
  className,
  inputTrue,
  value,
  onClick,
  onChange,
}) => {
  return (
    <div
      className={cn(
        'cursor-pointer',
        'flex items-center gap-2',
        'transition-opacity ease-in-out hover:opacity-70',
        className
      )}
    >
      {icon && (
        <div
          className={cn('text-xl', inputTrue ? 'text-blue-500' : '')}
          onClick={onClick}
        >
          {icon}
        </div>
      )}
      <input
        type="text"
        className={cn(
          'flex-1 px-4 py-2',
          'rounded-md border',
          inputTrue
            ? 'border-slate-700 bg-white'
            : 'border-slate-300 bg-slate-200'
        )}
        placeholder={placeholder}
        disabled={!inputTrue}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default SelectInput;
