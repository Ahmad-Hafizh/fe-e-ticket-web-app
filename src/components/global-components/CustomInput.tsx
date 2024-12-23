'use client';
import * as React from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  if (type != 'password') {
    return (
      <div className="flex flex-col h-fit w-full rounded-full border border-input bg-transparent px-5 py-1 text-base shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm xl:text-base focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
        <label className="text-xs">{props.title}</label>
        <input
          type={type}
          className={cn(' file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none !autofill:bg-transparent', className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-between gap-2 h-fit w-full rounded-full border border-input bg-transparent px-5 py-1 text-base shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm xl:text-base focus-within:outline-none focus-within:ring-1 focus-within:ring-ring relative">
        <div className="flex flex-col w-full">
          <label className="text-xs">{props.title}</label>
          <input
            type={isVisible ? 'text' : 'password'}
            className={cn(' file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none !autofill:bg-transparent', className)}
            ref={ref}
            {...props}
          />
        </div>
        <button type="button" className="w-fit" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <Eye className="text-gray-400 bg-white w-5 h-5" /> : <EyeOff className="text-gray-400 bg-white w-5 h-5" />}
        </button>
      </div>
    );
  }
});
Input.displayName = 'Input';

export { Input };
