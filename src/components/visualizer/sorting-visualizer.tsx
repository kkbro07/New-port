
"use client";

import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// --- Color Palette ---
const BAR_COLOR = 'hsl(var(--primary))';
const COMPARING_COLOR = 'hsl(var(--chart-2))';
const SWAPPING_COLOR = 'hsl(var(--destructive))';
const SORTED_COLOR = 'hsl(var(--chart-1))';

// --- State Management ---
type AnimationStep = {
  type: 'compare' | 'swap' | 'sorted';
  indices: number[];
  values?: number[];
};

type State = {
  array: number[];
  animations: AnimationStep[];
  currentStep: number;
  isSorting: boolean;
  isPaused: boolean;
  isSorted: boolean;
  numberOfBars: number;
  animationSpeed: number;
  algorithm: string;
};

type Action =
  | { type: 'SET_CONFIG'; payload: Partial<Omit<State, 'array' | 'animations'>> }
  | { type: 'START_SORT'; payload: { array: number[], animations: AnimationStep[] } }
  | { type: 'PAUSE_RESUME' }
  | { type: 'STEP_FORWARD' }
  | { type: 'RESET'; payload: { array: number[], numberOfBars: number } }
  | { type: 'SORT_COMPLETE' };

const initialStateFactory = (numberOfBars: number): State => ({
  array: [],
  animations: [],
  currentStep: -1,
  isSorting: false,
  isPaused: false,
  isSorted: false,
  numberOfBars: numberOfBars,
  animationSpeed: 500, // Default to 'Normal' speed in ms
  algorithm: 'bubbleSort',
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CONFIG':
      if (action.payload.numberOfBars && action.payload.numberOfBars !== state.numberOfBars) {
        // When number of bars changes, we need a full reset
        const newArray = [];
        for (let i = 0; i < action.payload.numberOfBars; i++) {
            newArray.push(Math.floor(Math.random() * (500 - 20 + 1)) + 20);
        }
        return { 
          ...initialStateFactory(action.payload.numberOfBars),
          array: newArray,
          numberOfBars: action.payload.numberOfBars,
          animationSpeed: state.animationSpeed,
          algorithm: state.algorithm,
        };
      }
      return { ...state, ...action.payload };
    case 'START_SORT':
      return {
        ...state,
        array: action.payload.array,
        animations: action.payload.animations,
        currentStep: 0,
        isSorting: true,
        isPaused: false,
        isSorted: false,
      };
    case 'PAUSE_RESUME':
      return { ...state, isPaused: !state.isPaused };
    case 'STEP_FORWARD':
        if(state.currentStep >= state.animations.length) {
            return { ...state, isSorting: false, isPaused: false, isSorted: true };
        }
      return { ...state, currentStep: state.currentStep + 1 };
    case 'RESET':
      return {
        ...initialStateFactory(action.payload.numberOfBars),
        array: action.payload.array,
        numberOfBars: action.payload.numberOfBars,
        animationSpeed: state.animationSpeed,
        algorithm: state.algorithm,
      };
    case 'SORT_COMPLETE':
      return { ...state, isSorting: false, isPaused: false, isSorted: true };
    default:
      return state;
  }
}

// --- Sorting Algorithms ---
const getBubbleSortAnimations = (array: number[]): AnimationStep[] => {
    const animations: AnimationStep[] = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    for (let i = 0; i < auxiliaryArray.length - 1; i++) {
        for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
            animations.push({ type: 'compare', indices: [j, j + 1] });
            if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                animations.push({
                  type: 'swap',
                  indices: [j, j + 1],
                  values: [auxiliaryArray[j+1], auxiliaryArray[j]]
                });
                [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
            }
        }
        animations.push({ type: 'sorted', indices: [auxiliaryArray.length - 1 - i]});
    }
    animations.push({ type: 'sorted', indices: [0]});
    return animations;
};

// --- Main Component ---
export function SortingVisualizer() {
    const isMobile = useIsMobile();
    const [state, dispatch] = useReducer(reducer, initialStateFactory(isMobile ? 10 : 15));
    const { array, animations, currentStep, isSorting, isPaused, isSorted, numberOfBars, animationSpeed, algorithm } = state;
    
    // Derived state for the array being displayed, which changes during animations
    const [displayArray, setDisplayArray] = useState<number[]>([]);
    const [barColors, setBarColors] = useState<string[]>([]);

    const generateRandomArray = useCallback((numBars: number) => {
        const newArray: number[] = [];
        for (let i = 0; i < numBars; i++) {
            newArray.push(Math.floor(Math.random() * (500 - 20 + 1)) + 20);
        }
        dispatch({ type: 'RESET', payload: { array: newArray, numberOfBars: numBars } });
    }, []);

    useEffect(() => {
        setDisplayArray(array);
    }, [array]);

    useEffect(() => {
        generateRandomArray(numberOfBars);
    }, []);


    const handleSort = () => {
        if (isSorting || isSorted) return;
        const originalArray = array.slice();
        let anims: AnimationStep[] = [];
        switch (algorithm) {
            case 'bubbleSort':
                anims = getBubbleSortAnimations(originalArray);
                break;
            default:
                break;
        }
        dispatch({ type: 'START_SORT', payload: { array: originalArray, animations: anims } });
    };

    const handleReset = () => {
        generateRandomArray(numberOfBars);
    }

    // Animation Effect
    useEffect(() => {
        if (!isSorting || isPaused || currentStep >= animations.length) {
            if (isSorting && currentStep >= animations.length) {
                dispatch({ type: 'SORT_COMPLETE' });
            }
            return;
        };

        const timeout = setTimeout(() => {
            const animationStep = animations[currentStep];
            
            // Create a temporary array to apply swaps to
            const newDisplayArray = [...displayArray];
            if (animationStep.type === 'swap') {
                const [index1, index2] = animationStep.indices;
                const [val1, val2] = animationStep.values!;
                newDisplayArray[index1] = val1;
                newDisplayArray[index2] = val2;
                setDisplayArray(newDisplayArray);
            }

            // Determine colors based on the current step
            const newBarColors = new Array(numberOfBars).fill(BAR_COLOR);
            // Color sorted elements first
            for(let i = 0; i < animations.length && i <= currentStep; i++) {
                if (animations[i].type === 'sorted') {
                    animations[i].indices.forEach(idx => {
                        if (idx < newBarColors.length) newBarColors[idx] = SORTED_COLOR;
                    });
                }
            }

            // Then apply active step colors
            if (animationStep) {
              switch (animationStep.type) {
                case 'compare':
                  animationStep.indices.forEach(i => {
                    if (newBarColors[i] !== SORTED_COLOR) newBarColors[i] = COMPARING_COLOR;
                  });
                  break;
                case 'swap':
                  animationStep.indices.forEach(i => {
                    if (newBarColors[i] !== SORTED_COLOR) newBarColors[i] = SWAPPING_COLOR;
                  });
                  break;
              }
            }
            
            setBarColors(newBarColors);

            dispatch({ type: 'STEP_FORWARD' });

        }, animationSpeed);

        return () => clearTimeout(timeout);
    }, [currentStep, isSorting, isPaused, animations, displayArray, animationSpeed, numberOfBars]);

    // Final "sorted" flash effect
    useEffect(() => {
        if (isSorted) {
            const newBarColors = new Array(numberOfBars).fill(SORTED_COLOR);
            setBarColors(newBarColors);
        } else if (!isSorting) {
            const newBarColors = new Array(numberOfBars).fill(BAR_COLOR);
            setBarColors(newBarColors);
        }
    }, [isSorted, isSorting, numberOfBars]);

    const statusText = useMemo(() => {
        if (currentStep < 0 || currentStep >= animations.length) return null;
    
        const step = animations[currentStep];
        let description = "";
        
        switch (step.type) {
          case 'compare':
            description = `Comparing values at indices ${step.indices[0]} and ${step.indices[1]}`;
            break;
          case 'swap':
            description = `Swapping values at indices ${step.indices[0]} and ${step.indices[1]}`;
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
      }, [currentStep, animations]);

    const isBusy = isSorting;
    const barWidth = useMemo(() => Math.max(800 / numberOfBars, 2), [numberOfBars]);

    return (
        <div className="flex flex-col items-center w-full gap-4">
            <Card className="w-full max-w-5xl p-4">
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                      <Select
                          onValueChange={(value) => dispatch({ type: 'SET_CONFIG', payload: { algorithm: value }})}
                          defaultValue={algorithm}
                          disabled={isBusy}
                      >
                          <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Algorithm" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Basic Sorts</SelectLabel>
                                <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                                <SelectItem value="selection" disabled>Selection Sort</SelectItem>
                                <SelectItem value="insertion" disabled>Insertion Sort</SelectItem>
                              </SelectGroup>
                               <SelectGroup>
                                <SelectLabel>Efficient Sorts</SelectLabel>
                                <SelectItem value="mergeSort" disabled>Merge Sort</SelectItem>
                                <SelectItem value="quickSort" disabled>Quick Sort</SelectItem>
                                <SelectItem value="heapSort" disabled>Heap Sort</SelectItem>
                              </SelectGroup>
                          </SelectContent>
                      </Select>
                      <Button onClick={handleReset} disabled={isSorting}>
                          Random Array
                      </Button>
                  </div>

                  <div className="flex items-center gap-2">
                       <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => isSorting ? dispatch({ type: 'PAUSE_RESUME' }) : handleSort()}
                          disabled={isSorted}
                        >
                          {isSorting && !isPaused ? <Pause /> : <Play />}
                       </Button>
                       <Button variant="ghost" size="icon" onClick={handleReset}>
                           <RotateCcw />
                       </Button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                          <label className="text-sm font-medium whitespace-nowrap">Size</label>
                          <Slider
                              value={[numberOfBars]}
                              onValueChange={(value) => dispatch({ type: 'SET_CONFIG', payload: { numberOfBars: value[0] }})}
                              min={5} max={15} step={1}
                              disabled={isBusy}
                              className="w-24"
                          />
                      </div>
                      <div className="flex items-center gap-2">
                          <label className="text-sm font-medium whitespace-nowrap">Speed</label>
                          <Select
                              onValueChange={(value) => dispatch({ type: 'SET_CONFIG', payload: { animationSpeed: Number(value) }})}
                              defaultValue={String(animationSpeed)}
                              disabled={isSorting && !isPaused}
                          >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Speed" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1000">Slow</SelectItem>
                                <SelectItem value="500">Normal</SelectItem>
                                <SelectItem value="100">Fast</SelectItem>
                                <SelectItem value="25">Very Fast</SelectItem>
                            </SelectContent>
                          </Select>
                      </div>
                  </div>
              </div>
            </Card>

            <Card className="w-full max-w-5xl h-[600px] p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex-grow flex items-end justify-center gap-1">
                    {displayArray.map((value, idx) => (
                        <div
                            className="array-bar group relative rounded-t-sm transition-colors duration-150"
                            key={idx}
                            style={{
                                backgroundColor: barColors[idx] || BAR_COLOR,
                                height: `${value}px`,
                                width: `${barWidth}px`,
                            }}>
                                {numberOfBars <= 50 && (
                                    <span className={cn(
                                        "absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground",
                                        barColors[idx] !== BAR_COLOR && "text-foreground font-bold"
                                    )}>
                                        {value}
                                    </span>
                                )}
                        </div>
                    ))}
                </div>
                {isSorting && statusText && (
                    <div className="mt-4 pt-4 border-t text-center">
                        <p className="text-sm text-muted-foreground">{statusText.step}</p>
                        <p className="mt-1 font-medium text-foreground">{statusText.description}</p>
                    </div>
                )}
            </Card>

            <Card className="w-full max-w-5xl p-2">
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2"><div className="h-4 w-4 rounded" style={{backgroundColor: BAR_COLOR}}></div><span>Unsorted</span></div>
                    <div className="flex items-center gap-2"><div className="h-4 w-4 rounded" style={{backgroundColor: COMPARING_COLOR}}></div><span>Comparing</span></div>
                    <div className="flex items-center gap-2"><div className="h-4 w-4 rounded" style={{backgroundColor: SWAPPING_COLOR}}></div><span>Swapping</span></div>
                    <div className="flex items-center gap-2"><div className="h-4 w-4 rounded" style={{backgroundColor: SORTED_COLOR}}></div><span>Sorted</span></div>
                </div>
            </Card>
        </div>
    );
}

    