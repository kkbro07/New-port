
"use client";

import React, { useMemo } from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

type VisualizerDisplayProps = {
    displayArray: number[];
    barColors: string[];
    numberOfBars: number;
    isSorting: boolean;
    statusText: { step: string; description: string; } | null;
};

export function VisualizerDisplay({
    displayArray,
    barColors,
    numberOfBars,
    isSorting,
    statusText,
}: VisualizerDisplayProps) {
    const barWidth = useMemo(() => Math.max(800 / numberOfBars, 2), [numberOfBars]);
    
    const maxValue = useMemo(() => {
        if (displayArray.length === 0) return 1;
        return Math.max(...displayArray);
    }, [displayArray]);

    return (
        <Card className="w-full max-w-5xl h-[600px] p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex-grow flex items-end justify-center gap-1">
                {displayArray.map((value, idx) => {
                    const barHeight = maxValue > 0 ? (value / maxValue) * 95 + 5 : 5; // Calculate percentage height, with a min of 5%
                    return (
                        <div
                            className="array-bar group relative rounded-t-sm transition-colors duration-150"
                            key={idx}
                            style={{
                                backgroundColor: barColors[idx] || 'hsl(var(--primary))',
                                height: `${barHeight}%`,
                                width: `${barWidth}px`,
                            }}>
                                {numberOfBars <= 50 && (
                                    <span className={cn(
                                        "absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground",
                                        barColors[idx] !== 'hsl(var(--primary))' && "text-foreground font-bold"
                                    )}>
                                        {value}
                                    </span>
                                )}
                        </div>
                    );
                })}
            </div>
            {isSorting && statusText && (
                <div className="mt-4 pt-4 border-t text-center">
                    <p className="text-sm text-muted-foreground">{statusText.step}</p>
                    <p className="mt-1 font-medium text-foreground">{statusText.description}</p>

                </div>
            )}
        </Card>
    );
}
