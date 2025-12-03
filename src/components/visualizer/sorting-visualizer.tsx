
"use client";

import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Play, Pause, RotateCcw, FastForward, Rewind } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

// --- Color Palette ---
// These will be defined in globals.css and accessed via CSS variables
const BAR_COLOR = 'hsl(var(--primary))';
const COMPARING_COLOR = 'hsl(var(--chart-2))'; // yellow
const SWAPPING_COLOR = 'hsl(var(--destructive))'; // red
const SORTED_COLOR = 'hsl(var(--chart-1))'; // green

// --- State Management ---
type State = {
  array: number[];
  animations: (string | number)[][];
  currentStep: number;
  isSorting: boolean;
  isPaused: boolean;
  isSorted: boolean;
  numberOfBars: number;
  animationSpeed: number;
  algorithm: string;
};

type Action = 
  | { type: 'SET_ARRAY'; payload: number[] }
  | { type: 'SET_ANIMATIONS'; payload: (string | number)[][] }
  | { type: 'START_SORTING' }
  | { type: 'PAUSE_SORTING' }
  | { type: 'STEP_FORWARD' }
  | { type: 'RESET' }
  | { type: 'SORT_COMPLETE' }
  | { type: 'SET_CONFIG'; payload: Partial<Pick<State, 'numberOfBars' | 'animationSpeed' | 'algorithm'>> };

const initialState: State = {
  array: [],
  animations: [],
  currentStep: 0,
  isSorting: false,
  isPaused: false,
  isSorted: false,
  numberOfBars: 50,
  animationSpeed: 50,
  algorithm: 'bubbleSort',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ARRAY':
      return { ...state, array: action.payload, isSorted: false, currentStep: 0, animations: [] };
    case 'SET_ANIMATIONS':
      return { ...state, animations: action.payload };
    case 'START_SORTING':
      return { ...state, isSorting: true, isPaused: false, isSorted: false };
    case 'PAUSE_SORTING':
        return { ...state, isPaused: !state.isPaused };
    case 'STEP_FORWARD':
      if(state.currentStep >= state.animations.length) {
        return { ...state, isSorting: false, isPaused: false, isSorted: true };
      }
      return { ...state, currentStep: state.currentStep + 1 };
    case 'RESET':
      return { ...initialState, array: [], numberOfBars: state.numberOfBars, animationSpeed: state.animationSpeed, algorithm: state.algorithm };
    case 'SORT_COMPLETE':
        return { ...state, isSorting: false, isPaused: false, isSorted: true, currentStep: 0, animations: [] };
    case 'SET_CONFIG':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}


// --- Sorting Algorithms ---
const getBubbleSortAnimations = (array: number[]): (string | number)[][] => {
    const animations: (string | number)[][] = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    for (let i = 0; i < auxiliaryArray.length - 1; i++) {
        for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
            animations.push(['compare', j, j + 1]);
            if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                animations.push(['swap', j, auxiliaryArray[j + 1]]);
                animations.push(['swap', j + 1, auxiliaryArray[j]]);
                [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
            }
        }
        animations.push(['sorted', auxiliaryArray.length - 1 - i]);
    }
    animations.push(['sorted', 0]);
    return animations;
};


// --- Main Component ---
export function SortingVisualizer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { array, animations, currentStep, isSorting, isPaused, isSorted, numberOfBars, animationSpeed, algorithm } = state;
    const containerRef = React.useRef<HTMLDivElement>(null);
    
    const resetArray = useCallback(() => {
        const newArray: number[] = [];
        for (let i = 0; i < numberOfBars; i++) {
            newArray.push(Math.floor(Math.random() * (600 - 5 + 1)) + 5);
        }
        dispatch({ type: 'RESET' });
        dispatch({ type: 'SET_ARRAY', payload: newArray });

        const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
        for(let i=0; i<arrayBars.length; i++) {
            if(arrayBars[i]) arrayBars[i].style.backgroundColor = BAR_COLOR;
        }

    }, [numberOfBars]);

    useEffect(() => {
        resetArray();
    }, [numberOfBars, resetArray]);

    const handleSort = () => {
        let anims: (string|number)[][] = [];
        switch (algorithm) {
            case 'bubbleSort':
                anims = getBubbleSortAnimations(array);
                break;
            default:
                break;
        }
        dispatch({ type: 'SET_ANIMATIONS', payload: anims });
        dispatch({ type: 'START_SORTING' });
    };
    
    useEffect(() => {
        if (!isSorting || isPaused || currentStep >= animations.length) {
            if (isSorting && currentStep >= animations.length) {
                dispatch({ type: 'SORT_COMPLETE' });
            }
            return;
        }

        const timer = setTimeout(() => {
            dispatch({ type: 'STEP_FORWARD' });
        }, 101 - animationSpeed);
        
        return () => clearTimeout(timer);
    }, [currentStep, isSorting, isPaused, animations.length, animationSpeed]);


    useEffect(() => {
      const arrayBars = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>);
      if(!arrayBars.length) return;
      if (isSorted) {
          arrayBars.forEach((bar, index) => {
              setTimeout(() => {
                  bar.style.backgroundColor = SORTED_COLOR;
              }, index * 5);
          });
          return;
      }
      if (currentStep === 0 && !isSorting) {
          arrayBars.forEach(bar => bar.style.backgroundColor = BAR_COLOR);
          return;
      }
      if (animations.length === 0 || currentStep === 0) return;
  
      const prevAnimation = animations[currentStep - 1];
      const [prevAction, prevBarOne, prevBarTwo] = prevAnimation;
      // Revert previous comparison colors
      if (prevAction === 'compare') {
          if(arrayBars[prevBarOne as number]) arrayBars[prevBarOne as number].style.backgroundColor = BAR_COLOR;
          if(arrayBars[prevBarTwo as number]) arrayBars[prevBarTwo as number].style.backgroundColor = BAR_COLOR;
      }

      if (currentStep >= animations.length) return;
      
      const [action, barOneIdx, barTwoVal] = animations[currentStep];

      switch(action) {
          case 'compare':
              if(arrayBars[barOneIdx as number]) arrayBars[barOneIdx as number].style.backgroundColor = COMPARING_COLOR;
              if(arrayBars[barTwoVal as number]) arrayBars[barTwoVal as number].style.backgroundColor = COMPARING_COLOR;
              break;
          case 'swap':
              if(arrayBars[barOneIdx as number]) {
                const barStyle = arrayBars[barOneIdx as number].style;
                barStyle.height = `${barTwoVal}px`;
                barStyle.backgroundColor = SWAPPING_COLOR;
              }
              break;
          case 'sorted':
              if(arrayBars[barOneIdx as number]) {
                arrayBars[barOneIdx as number].style.backgroundColor = SORTED_COLOR;
              }
              break;
      }

  }, [currentStep, animations, isSorting, isSorted]);


    const isBusy = isSorting || isSorted;

    return (
        <div className="flex flex-col items-center w-full gap-4">
            <Card className="w-full max-w-5xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
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
                      <Button onClick={resetArray} disabled={isSorting}>
                          Random Array
                      </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                       <Button variant="ghost" size="icon" disabled>
                           <Rewind />
                       </Button>
                       <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => isSorting ? dispatch({ type: 'PAUSE_SORTING' }) : handleSort()}
                          disabled={isSorted}
                        >
                          {isSorting && !isPaused ? <Pause /> : <Play />}
                       </Button>
                       <Button variant="ghost" size="icon" disabled>
                           <FastForward />
                       </Button>
                       <Button variant="ghost" size="icon" onClick={resetArray}>
                           <RotateCcw />
                       </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
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
                              disabled={isSorting}
                              className="w-24"
                          />
                      </div>
                  </div>
              </div>
            </Card>

            <Card ref={containerRef} className="w-full max-w-5xl h-[650px] p-4 flex items-end justify-center gap-0.5 overflow-hidden">
                {array.map((value, idx) => (
                    <div
                        className="array-bar rounded-t-sm transition-all duration-150"
                        key={idx}
                        style={{
                            backgroundColor: BAR_COLOR,
                            height: `${value}px`,
                            width: `${Math.max(1000 / numberOfBars, 2)}px`,
                        }}>
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

    