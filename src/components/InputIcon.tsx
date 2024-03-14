import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

type InputIconProps = ComponentPropsWithoutRef<'input'> & {
  icon?: ReactNode;
};

const InputIcon = forwardRef<HTMLInputElement, InputIconProps>(
  ({ className, icon, ...rest }, ref) => {
    return (
      <div className="relative mb-6">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          {...rest}
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900"
        />
      </div>
    );
  }
);

export default InputIcon;

InputIcon.displayName = 'Input';
