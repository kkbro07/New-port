
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Play, Pause, RotateCcw, ChevronsDownUp, SkipBack, SkipForward } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { State, Action } from './visualizer-state';

type VisualizerControlsProps = {
    state: State;
    dispatch: React.Dispatch<Action>;
    isCustomInputOpen: boolean;
    setCustomInputOpen: (isOpen: boolean) => void;
    customArrayInput: string;
    setCustomArrayInput: (input: string) => void;
    onSetCustomArray: () => void;
    onReset: () => void;
    onSort: () => void;
    onStepForward: () => void;
    onStepBackward: () => void;
};

export function VisualizerControls({
    state,
    dispatch,
    isCustomInputOpen,
    setCustomInputOpen,
    customArrayInput,
    setCustomArrayInput,
    onSetCustomArray,
    onReset,
    onSort,
    onStepForward,
    onStepBackward,
}: VisualizerControlsProps) {
    const { algorithm, isSorting, isPaused, isSorted, numberOfBars, animationSpeed } = state;
    const isBusy = isSorting && !isPaused;

    return (
        <Card className="w-full max-w-5xl p-4">
            <Collapsible open={isCustomInputOpen} onOpenChange={setCustomInputOpen}>
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
                        <Button onClick={onReset} disabled={isSorting}>
                            Random Array
                        </Button>
                        <CollapsibleTrigger asChild>
                            <Button variant="outline" disabled={isSorting}>
                                <ChevronsDownUp className="mr-2 h-4 w-4" />
                                Custom Array
                            </Button>
                        </CollapsibleTrigger>
                    </div>

                    <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={onStepBackward} disabled={isBusy || !isSorting || state.currentStep <= -1}>
                            <SkipBack />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => isSorting ? dispatch({ type: 'PAUSE_RESUME' }) : onSort()}
                            disabled={isSorted}
                        >
                            {isSorting && !isPaused ? <Pause /> : <Play />}
                        </Button>
                            <Button variant="ghost" size="icon" onClick={onStepForward} disabled={isBusy || !isSorting || state.currentStep >= state.animations.length - 1}>
                            <SkipForward />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onReset}>
                            <RotateCcw />
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
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
                <CollapsibleContent className="mt-4">
                    <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
                        <Input 
                            placeholder="Enter numbers separated by commas (max 15)" 
                            className="flex-1"
                            value={customArrayInput}
                            onChange={(e) => setCustomArrayInput(e.target.value)}
                        />
                        <Button onClick={onSetCustomArray}>Set Array</Button>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}
