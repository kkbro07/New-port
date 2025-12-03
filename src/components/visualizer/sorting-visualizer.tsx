
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
  type: 'compare' | 'swap' | 'sorted' | 'overwrite';
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

const getSelectionSortAnimations = (array: number[]): AnimationStep[] => {
    const animations: AnimationStep[] = [];
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            animations.push({ type: 'compare', indices: [minIdx, j] });
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        animations.push({ type: 'swap', indices: [i, minIdx], values: [array[minIdx], array[i]] });
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        animations.push({ type: 'sorted', indices: [i] });
    }
    animations.push({ type: 'sorted', indices: [n-1] });
    return animations;
};

const getInsertionSortAnimations = (array: number[]): AnimationStep[] => {
    const animations: AnimationStep[] = [];
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        animations.push({ type: 'compare', indices: [i, j] });
        while (j >= 0 && array[j] > key) {
            animations.push({ type: 'overwrite', indices: [j+1], values: [array[j]] });
            array[j + 1] = array[j];
            j = j - 1;
            if (j >= 0) animations.push({ type: 'compare', indices: [i, j] });
        }
        animations.push({ type: 'overwrite', indices: [j+1], values: [key] });
        array[j + 1] = key;
    }
    for (let i=0; i<n; i++) animations.push({ type: 'sorted', indices: [i] });
    return animations;
};

const getMergeSortAnimations = (array: number[]): AnimationStep[] => {
    const animations: AnimationStep[] = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
};

function mergeSortHelper(mainArray: number[], startIdx: number, endIdx: number, auxiliaryArray: number[], animations: AnimationStep[]) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray: number[], startIdx: number, middleIdx: number, endIdx: number, auxiliaryArray: number[], animations: AnimationStep[]) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push({ type: 'compare', indices: [i, j] });
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push({ type: 'overwrite', indices: [k], values: [auxiliaryArray[i]] });
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push({ type: 'overwrite', indices: [k], values: [auxiliaryArray[j]] });
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push({ type: 'overwrite', indices: [k], values: [auxiliaryArray[i]] });
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push({ type: 'overwrite', indices: [k], values: [auxiliaryArray[j]] });
        mainArray[k++] = auxiliaryArray[j++];
    }
}


const getQuickSortAnimations = (array: number[]): AnimationStep[] => {
    const animations: AnimationStep[] = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    for(let i=0; i<array.length; i++) animations.push({ type: 'sorted', indices: [i] });
    return animations;
};

function quickSortHelper(array: number[], low: number, high: number, animations: AnimationStep[]) {
    if (low < high) {
        const pi = partition(array, low, high, animations);
        quickSortHelper(array, low, pi - 1, animations);
        quickSortHelper(array, pi + 1, high, animations);
    }
}

function partition(array: number[], low: number, high: number, animations: AnimationStep[]) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        animations.push({ type: 'compare', indices: [j, high] });
        if (array[j] < pivot) {
            i++;
            animations.push({ type: 'swap', indices: [i, j], values: [array[j], array[i]] });
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    animations.push({ type: 'swap', indices: [i + 1, high], values: [array[high], array[i + 1]] });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
}

const getHeapSortAnimations = (array: number[]): AnimationStep[] => {
    const animations: AnimationStep[] = [];
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }
    for (let i = n - 1; i > 0; i--) {
        animations.push({ type: 'swap', indices: [0, i], values: [array[i], array[0]] });
        [array[0], array[i]] = [array[i], array[0]];
        animations.push({ type: 'sorted', indices: [i] });
        heapify(array, i, 0, animations);
    }
    animations.push({ type: 'sorted', indices: [0] });
    return animations;
};

function heapify(array: number[], n: number, i: number, animations: AnimationStep[]) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) animations.push({ type: 'compare', indices: [largest, left] });
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n) animations.push({ type: 'compare', indices: [largest, right] });
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    if (largest !== i) {
        animations.push({ type: 'swap', indices: [i, largest], values: [array[largest], array[i]] });
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest, animations);
    }
}

const getCocktailSortAnimations = (array: number[]): AnimationStep[] => {
    const animations: AnimationStep[] = [];
    let swapped = true;
    let start = 0;
    let end = array.length;

    while (swapped) {
        swapped = false;
        for (let i = start; i < end - 1; ++i) {
            animations.push({ type: 'compare', indices: [i, i + 1] });
            if (array[i] > array[i + 1]) {
                animations.push({ type: 'swap', indices: [i, i+1], values: [array[i+1], array[i]] });
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        animations.push({ type: 'sorted', indices: [end-1]});
        end = end - 1;
        for (let i = end - 1; i >= start; i--) {
            animations.push({ type: 'compare', indices: [i, i + 1] });
            if (array[i] > array[i + 1]) {
                animations.push({ type: 'swap', indices: [i, i+1], values: [array[i+1], array[i]] });
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
        animations.push({ type: 'sorted', indices: [start]});
        start = start + 1;
    }
    for(let i=start; i<end; i++) animations.push({ type: 'sorted', indices: [i] });
    return animations;
};

const getShellSortAnimations = (array: number[]): AnimationStep[] => {
    const animations: AnimationStep[] = [];
    const n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i += 1) {
            const temp = array[i];
            let j;
            animations.push({ type: 'compare', indices: [i, i-gap] });
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                animations.push({ type: 'compare', indices: [j, j-gap] });
                animations.push({ type: 'overwrite', indices: [j], values: [array[j - gap]] });
                array[j] = array[j - gap];
            }
            animations.push({ type: 'overwrite', indices: [j], values: [temp] });
            array[j] = temp;
        }
    }
    for(let i=0; i<n; i++) animations.push({ type: 'sorted', indices: [i] });
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
            case 'selectionSort':
                anims = getSelectionSortAnimations(originalArray);
                break;
            case 'insertionSort':
                anims = getInsertionSortAnimations(originalArray);
                break;
            case 'mergeSort':
                anims = getMergeSortAnimations(originalArray);
                break;
            case 'quickSort':
                anims = getQuickSortAnimations(originalArray);
                break;
            case 'heapSort':
                anims = getHeapSortAnimations(originalArray);
                break;
            case 'cocktailSort':
                anims = getCocktailSortAnimations(originalArray);
                break;
            case 'shellSort':
                anims = getShellSortAnimations(originalArray);
                break;
            default:
                anims = getBubbleSortAnimations(originalArray);
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
            
            const newDisplayArray = [...displayArray];
            if (animationStep.type === 'swap' || animationStep.type === 'overwrite') {
                if(animationStep.values) {
                    animationStep.indices.forEach((index, i) => {
                        newDisplayArray[index] = animationStep.values![i];
                    });
                    setDisplayArray(newDisplayArray);
                }
            }

            const newBarColors = new Array(numberOfBars).fill(BAR_COLOR);
            for(let i = 0; i < animations.length && i <= currentStep; i++) {
                if (animations[i].type === 'sorted') {
                    animations[i].indices.forEach(idx => {
                        if (idx < newBarColors.length) newBarColors[idx] = SORTED_COLOR;
                    });
                }
            }

            if (animationStep) {
              switch (animationStep.type) {
                case 'compare':
                  animationStep.indices.forEach(i => {
                    if (newBarColors[i] !== SORTED_COLOR) newBarColors[i] = COMPARING_COLOR;
                  });
                  break;
                case 'swap':
                case 'overwrite':
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
                                <SelectItem value="selectionSort">Selection Sort</SelectItem>
                                <SelectItem value="insertionSort">Insertion Sort</SelectItem>
                              </SelectGroup>
                               <SelectGroup>
                                <SelectLabel>Efficient Sorts</SelectLabel>
                                <SelectItem value="mergeSort">Merge Sort</SelectItem>
                                <SelectItem value="quickSort">Quick Sort</SelectItem>
                                <SelectItem value="heapSort">Heap Sort</SelectItem>
                              </SelectGroup>
                               <SelectGroup>
                                <SelectLabel>Other Sorts</SelectLabel>
                                <SelectItem value="cocktailSort">Cocktail Sort</SelectItem>
                                <SelectItem value="shellSort">Shell Sort</SelectItem>
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

    