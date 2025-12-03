
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
  animationSpeed: 50,
  algorithm: 'bubbleSort',
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CONFIG':
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
    const [state, dispatch] = useReducer(reducer, initialStateFactory(isMobile ? 20 : 50));
    const { array, animations, currentStep, isSorting, isPaused, isSorted, numberOfBars, animationSpeed, algorithm } = state;
    
    // Derived state for the array being displayed, which changes during animations
    const [displayArray, setDisplayArray] = useState<number[]>([]);
    const [barColors, setBarColors] = useState<string[]>([]);

    const generateRandomArray = useCallback(() => {
        const newArray: number[] = [];
        for (let i = 0; i < numberOfBars; i++) {
            newArray.push(Math.floor(Math.random() * (500 - 20 + 1)) + 20);
        }
        dispatch({ type: 'RESET', payload: { array: newArray, numberOfBars } });
        setDisplayArray(newArray);
    }, [numberOfBars]);

    useEffect(() => {
        generateRandomArray();
    }, [numberOfBars]);

    const handleSort = () => {
        if (isSorted) return;
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
        generateRandomArray();
    }

    // Animation Effect
    useEffect(() => {
        if (!isSorting || isPaused) return;

        const timeout = setTimeout(() => {
            if (currentStep >= animations.length) {
                dispatch({ type: 'SORT_COMPLETE' });
                return;
            }

            const animationStep = animations[currentStep];
            const newDisplayArray = [...displayArray];
            const newBarColors = new Array(numberOfBars).fill(BAR_COLOR);

            animations.slice(0, currentStep + 1).forEach(step => {
                if (step.type === 'sorted') {
                    step.indices.forEach(i => newBarColors[i] = SORTED_COLOR);
                }
            });

            if (animationStep) {
              switch (animationStep.type) {
                case 'compare':
                  animationStep.indices.forEach(i => {
                    if (newBarColors[i] !== SORTED_COLOR) newBarColors[i] = COMPARING_COLOR;
                  });
                  break;
                case 'swap':
                  const [index1, index2] = animationStep.indices;
                  const [val1, val2] = animationStep.values!;
                  newDisplayArray[index1] = val1;
                  newDisplayArray[index2] = val2;
                  if (newBarColors[index1] !== SORTED_COLOR) newBarColors[index1] = SWAPPING_COLOR;
                  if (newBarColors[index2] !== SORTED_COLOR) newBarColors[index2] = SWAPPING_COLOR;
                  break;
                case 'sorted':
                  animationStep.indices.forEach(i => newBarColors[i] = SORTED_COLOR);
                  break;
              }
            }
            
            setDisplayArray(newDisplayArray);
            setBarColors(newBarColors);

            dispatch({ type: 'STEP_FORWARD' });

        }, 101 - animationSpeed);

        return () => clearTimeout(timeout);
    }, [currentStep, isSorting, isPaused, animations, displayArray, animationSpeed, numberOfBars]);

    // Final "sorted" flash effect
    useEffect(() => {
        if (isSorted) {
            const newBarColors = new Array(numberOfBars).fill(SORTED_COLOR);
            setBarColors(newBarColors);
        } else {
            const newBarColors = new Array(numberOfBars).fill(BAR_COLOR);
            setBarColors(newBarColors);
        }
    }, [isSorted, numberOfBars]);

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
                              min={10} max={100} step={1}
                              disabled={isBusy}
                              className="w-24"
                          />
                      </div>
                      <div className="flex items-center gap-2">
                          <label className="text-sm font-medium whitespace-nowrap">Speed</label>
                          <Slider
                              value={[animationSpeed]}
                              onValueChange={(value) => dispatch({ type: 'SET_CONFIG', payload: { animationSpeed: value[0] }})}
                              min={1} max={100} step={1}
                              disabled={isSorting && !isPaused}
                              className="w-24"
                          />
                      </div>
                  </div>
              </div>
            </Card>

            <Card className="w-full max-w-5xl h-[600px] p-4 flex items-end justify-center gap-1 overflow-hidden">
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
    
