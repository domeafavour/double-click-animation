import React from 'react';

type Ref = React.ComponentRef<'button'> | null;

type Props = React.ComponentPropsWithoutRef<'button'>;

export type { Ref as ButtonRef, Props as ButtonProps };

export const Button = React.forwardRef<Ref, Props>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        className="rounded-md border border-solid border-gray-500 bg-slate-100 p-2 hover:bg-slate-200"
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
