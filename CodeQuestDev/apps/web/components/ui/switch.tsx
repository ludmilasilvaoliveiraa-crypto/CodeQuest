// CodeQuest - Switch Component (shadcn/ui style)
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, checked, onCheckedChange, ...props }, ref) => {
        return (
            <label className="relative inline-flex cursor-pointer items-center">
                <input
                    type="checkbox"
                    ref={ref}
                    checked={checked}
                    onChange={(e) => onCheckedChange?.(e.target.checked)}
                    className="sr-only"
                    {...props}
                />
                <div
                    className={cn(
                        'h-6 w-11 rounded-full transition-colors',
                        checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700',
                        className
                    )}
                >
                    <div
                        className={cn(
                            'h-5 w-5 rounded-full bg-white shadow-sm transition-transform mt-0.5',
                            checked ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'
                        )}
                    />
                </div>
            </label>
        );
    }
);

Switch.displayName = 'Switch';

export { Switch };
