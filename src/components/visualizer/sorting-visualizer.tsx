
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { getAnimations } from '@/lib/algorithms';
import type { State, Action } from './visualizer-state';
import { VisualizerControls } from './visualizer-controls';
import { VisualizerDisplay } from './visualizer-display';
import { VisualizerLegend } from './visualizer-legend';

type SortingVisualizerProps = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

// --- Main Component ---
export function SortingVisualizer({ state, dispatch }: SortingVisualizerProps) {
    const isMobile = useIsMobile();
    const { array, animations, currentStep, isSorting, isPaused, isSorted, numberOfBars, animationSpeed, algorithm } = state;
    
    const [displayArray, setDisplayArray] = useState<number[]>([]);
    const [barColors, setBarColors] = useState<string[]>([]);
    const [customArrayInput, setCustomArrayInput] = useState('');
    const [isCustomInputOpen, setCustomInputOpen] = useState(false);
    const { toast } = useToast();

    const generateRandomArray = useCallback((numBars: number) => {
        const newArray: number[] = [];
        for (let i = 0; i < numBars; i++) {
            newArray.push(Math.floor(Math.random() * (99 - 5 + 1)) + 5);
        }
        dispatch({ type: 'RESET', payload: { array: newArray, numberOfBars: numBars } });
    }, [dispatch]);

    useEffect(() => {
        generateRandomArray(numberOfBars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSort = () => {
        if (isSorting && !isPaused) return; // Already playing
        if (isSorted) return; // Already sorted
    
        if (!isSorting) { // Starting a new sort
            const originalArray = array.slice();
            const anims = getAnimations(algorithm, originalArray);
            dispatch({ type: 'START_SORT', payload: { array: originalArray, animations: anims } });
        } else { // Resuming a paused sort
            dispatch({ type: 'PAUSE_RESUME' });
        }
    };

    const handleReset = () => {
        generateRandomArray(numberOfBars);
    }
    
    const handleStepForward = () => {
        if (isSorting) {
            dispatch({ type: 'STEP_FORWARD' });
        }
    };
    
    const handleStepBackward = () => {
        if (isSorting) {
            dispatch({ type: 'STEP_BACKWARD' });
        }
    };

    const handleSetCustomArray = () => {
        const numbers = customArrayInput.split(',').map(s => s.trim()).filter(Boolean).map(Number);
        
        if (numbers.some(isNaN)) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter only numbers separated by commas.' });
            return;
        }

        if (numbers.length === 0) {
            toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter at least one number.' });
            return;
        }

        if (numbers.length > 15) {
            toast({ variant: 'destructive', title: 'Array Too Large', description: 'Please enter a maximum of 15 numbers.' });
            return;
        }
        
        dispatch({ type: 'RESET', payload: { array: numbers, numberOfBars: numbers.length } });
        setCustomInputOpen(false);
        setCustomArrayInput('');
    }

    const updateVisuals = useCallback((stepIndex: number) => {
        let tempArray = array.slice();
        const colors = new Array(numberOfBars).fill('hsl(var(--primary))');

        if (stepIndex === -1) {
            setDisplayArray(tempArray);
            setBarColors(colors);
            return;
        }

        for (let i = 0; i <= stepIndex; i++) {
            if(i >= animations.length) continue;
            const step = animations[i];
            if (step.type === 'swap') {
                const [idx1, idx2] = step.indices;
                [tempArray[idx1], tempArray[idx2]] = [tempArray[idx2], tempArray[idx1]];
            } else if (step.type === 'overwrite') {
                const [idx] = step.indices;
                tempArray[idx] = step.values![0];
            }
        }
        
        for(let i = 0; i <= stepIndex; i++) {
             if(i >= animations.length) continue;
            if (animations[i].type === 'sorted') {
                animations[i].indices.forEach(idx => {
                    if (idx < colors.length) colors[idx] = 'hsl(var(--chart-1))';
                });
            }
        }
        
        const finalStep = animations[stepIndex];
        if (finalStep) {
            switch (finalStep.type) {
                case 'compare':
                    finalStep.indices.forEach(i => {
                        if (colors[i] !== 'hsl(var(--chart-1))') colors[i] = 'hsl(var(--chart-2))';
                    });
                    break;
                case 'swap':
                case 'overwrite':
                    finalStep.indices.forEach(i => {
                        if (colors[i] !== 'hsl(var(--chart-1))') colors[i] = 'hsl(var(--destructive))';
                    });
                    break;
            }
        }
        
        setDisplayArray(tempArray);
        setBarColors(colors);
    }, [array, animations, numberOfBars]);

    // Animation Effect for both auto-play and manual steps
    useEffect(() => {
        updateVisuals(currentStep);
    }, [currentStep, updateVisuals]);


    // This effect handles the automatic playback of the animation.
    useEffect(() => {
        if (!isSorting || isPaused || currentStep >= animations.length - 1) {
            if (isSorting && !isPaused && currentStep >= animations.length - 1) {
                dispatch({ type: 'SORT_COMPLETE' });
            }
            return; 
        }

        const timeout = setTimeout(() => {
            dispatch({ type: 'AUTO_STEP_FORWARD' });
        }, animationSpeed);

        return () => clearTimeout(timeout);
    }, [currentStep, isSorting, isPaused, animations, animationSpeed, dispatch]);


    // Final "sorted" flash effect
    useEffect(() => {
        if (isSorted) {
            const newBarColors = new Array(numberOfBars).fill('hsl(var(--chart-1))');
            setBarColors(newBarColors);
        } else if (!isSorting) {
            const newBarColors = new Array(numberOfBars).fill('hsl(var(--primary))');
            setBarColors(newBarColors);
        }
    }, [isSorted, isSorting, numberOfBars]);

    const statusText = useMemo(() => {
        if (!isSorting || currentStep < 0 || currentStep >= animations.length) return null;
    
        const step = animations[currentStep];
        let description = "";
        
        switch (step.type) {
          case 'compare':
            description = `Comparing values at indices ${step.indices[0]} and ${step.indices[1]}`;
            break;
          case 'swap':
            description = `Swapping values at indices ${step.indices[0]} and ${step.indices[1]}`;
            break;
          case 'overwrite':
            description = `Overwriting index ${step.indices[0]} with value ${step.values ? step.values[0] : ''}`;
            break;
          case 'sorted':
            description = `Element at index ${step.indices[0]} is sorted`;
            break;
          default:
            description = 'Sorting...'
        }
    
        return {
          step: `Step ${currentStep + 1} of ${animations.length}`,
          description,
        };
      }, [currentStep, animations, isSorting]);

    return (
        <div className="flex flex-col items-center w-full gap-4">
            <VisualizerControls 
                state={state}
                dispatch={dispatch}
                isCustomInputOpen={isCustomInputOpen}
                setCustomInputOpen={setCustomInputOpen}
                customArrayInput={customArrayInput}
                setCustomArrayInput={setCustomArrayInput}
                onSetCustomArray={handleSetCustomArray}
                onReset={handleReset}
                onSort={handleSort}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
            />

            <VisualizerDisplay
                displayArray={displayArray}
                barColors={barColors}
                numberOfBars={numberOfBars}
                isSorting={isSorting}
                statusText={statusText}
            />

            <VisualizerLegend />
        </div>
    );
}
