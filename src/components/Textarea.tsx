import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...rest }, ref) => {
    return (
      <textarea
        className={cn(
          'resize-none rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400',
          'px-3 py-2 leading-6',
          className
        )}
        rows={15}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default Textarea;

Textarea.displayName = 'Textarea';
