
"use client";

import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { getAnimations } from '@/lib/algorithms';
import type { AnimationStep } from '@/lib/algorithms';
import { initialStateFactory, reducer } from './visualizer-state';
import { VisualizerControls } from './visualizer-controls';
import { VisualizerDisplay } from './visualizer-display';
import { VisualizerLegend } from './visualizer-legend';

// --- Main Component ---
export function SortingVisualizer() {
    const isMobile = useIsMobile();
    const [state, dispatch] = useReducer(reducer, initialStateFactory(isMobile ? 15 : 15));
    const { array, animations, currentStep, isSorting, isPaused, isSorted, numberOfBars, animationSpeed, algorithm } = state;
    
    // Derived state for the array being displayed, which changes during animations
    const [displayArray, setDisplayArray] = useState<number[]>([]);
    const [barColors, setBarColors] = useState<string[]>([]);
    const [customArrayInput, setCustomArrayInput] = useState('');
    const [isCustomInputOpen, setCustomInputOpen] = useState(false);
    const { toast } = useToast();

    const generateRandomArray = useCallback((numBars: number) => {
        const newArray: number[] = [];
        for (let i = 0; i < numBars; i++) {
            newArray.push(Math.floor(Math.random() * (500 - 20 + 1)) + 20);
        }
        dispatch({ type: 'RESET', payload: { array: newArray, numberOfBars: numBars } });
    }, []);

    useEffect(() => {
        generateRandomArray(numberOfBars);
    }, []);

    const handleSort = () => {
        if (isSorting || isSorted) return;
        const originalArray = array.slice();
        const anims = getAnimations(algorithm, originalArray);
        dispatch({ type: 'START_SORT', payload: { array: originalArray, animations: anims } });
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

    // Animation Effect
    useEffect(() => {
        let tempArray = array.slice();
        const colors = new Array(numberOfBars).fill('hsl(var(--primary))');

        if (currentStep === -1) {
            setDisplayArray(tempArray);
            setBarColors(colors);
            return;
        }

        // Replay animations up to the current step to rebuild state
        for (let i = 0; i <= currentStep; i++) {
            const step = animations[i];
            if (step.type === 'swap') {
                const [idx1, idx2] = step.indices;
                [tempArray[idx1], tempArray[idx2]] = [tempArray[idx2], tempArray[idx1]];
            } else if (step.type === 'overwrite') {
                const [idx] = step.indices;
                tempArray[idx] = step.values![0];
            }
        }
        
        // Color sorted elements
        for(let i = 0; i <= currentStep; i++) {
            if (animations[i].type === 'sorted') {
                animations[i].indices.forEach(idx => {
                    if (idx < colors.length) colors[idx] = 'hsl(var(--chart-1))';
                });
            }
        }
        
        // Color elements from the current step
        const finalStep = animations[currentStep];
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

    }, [currentStep, array, animations, numberOfBars]);


    // This effect handles the automatic playback of the animation.
    useEffect(() => {
        // Conditions to stop the animation:
        // - Not sorting
        // - Is paused
        // - Reached the end of the animation sequence
        if (!isSorting || isPaused || currentStep >= animations.length - 1) {
            // If the animation reached the end while playing, mark it as complete.
            if (isSorting && !isPaused && currentStep >= animations.length - 1) {
                dispatch({ type: 'SORT_COMPLETE' });
            }
            return; // Stop the effect
        }

        // Schedule the next step
        const timeout = setTimeout(() => {
            dispatch({ type: 'STEP_FORWARD' });
        }, animationSpeed);

        // Cleanup function to clear the timeout if the component unmounts
        // or if the dependencies change before the timeout finishes.
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
