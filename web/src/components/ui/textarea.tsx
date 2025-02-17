import * as React from 'react';

import { cn } from '@/lib/utils';
import { FloatingLabel } from '../elements';

interface FloatingLabelTextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  label: string;
  labelCentered?: boolean;
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextareaProps
>(({ id, label, labelCentered = true, className, ...props }, ref) => {
  return (
    <div className="relative">
      <textarea
        id={id}
        ref={ref}
        className={cn(
          'flex min-h-[80px] w-full peer rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        placeholder=" "
        {...props}
      />
      <FloatingLabel labelCentered={labelCentered} htmlFor={id}>
        {label}
      </FloatingLabel>
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
