'use client';

import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    console.error(error);
    return (
        <div className="max-w-xl mx-auto mt-10 text-center space-y-4">
            <h2 className="text-lg font-semibold text-destructive">
                Something went wrong
            </h2>

            <p className="text-sm text-muted-foreground">
                {process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong. Please try again.'}
            </p>

            <p className="text-xs text-muted-foreground">
                Please try again or contact support if the issue persists.
            </p>

            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
}
