
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PRIMARY_COLOR = 'hsl(var(--primary))';
const SECONDARY_COLOR = 'hsl(var(--secondary))';
const ACCENT_COLOR = 'hsl(var(--destructive))';

// The Bubble Sort implementation that returns an array of animations
const getBubbleSortAnimations = (array: number[]): (number[] | string)[][] => {
    const animations: (number[] | string)[][] = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    bubbleSortHelper(auxiliaryArray, animations);
    return animations;
};

function bubbleSortHelper(
    mainArray: number[],
    animations: (number[] | string)[][],
) {
    const n = mainArray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([j, j + 1, 'color-change-start']); // Comparing these two
            if (mainArray[j] > mainArray[j + 1]) {
                animations.push([j, mainArray[j + 1], 'swap']); // Swap heights
                animations.push([j + 1, mainArray[j], 'swap']); // Swap heights
                let temp = mainArray[j];
                mainArray[j] = mainArray[j + 1];
                mainArray[j + 1] = temp;
            }
            animations.push([j, j + 1, 'color-change-revert']); // Revert color
        }
    }
}


export function SortingVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [numberOfBars, setNumberOfBars] = useState(50);
    const [animationSpeed, setAnimationSpeed] = useState(50);
    const [isSorting, setIsSorting] = useState(false);
    const [algorithm, setAlgorithm] = useState('bubbleSort');

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < numberOfBars; i++) {
            newArray.push(randomIntFromInterval(5, 600));
        }
        setArray(newArray);
        
        // Reset bar colors
        const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
        for(let i=0; i<arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    };

    useEffect(() => {
        resetArray();
    }, [numberOfBars]);

    const handleSort = () => {
        setIsSorting(true);
        switch (algorithm) {
            case 'bubbleSort':
                bubbleSort();
                break;
            default:
                break;
        }
    };
    
    const bubbleSort = () => {
        const animations = getBubbleSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
            const [barOneIdx, barTwoVal, action] = animations[i];

            setTimeout(() => {
                if (action === 'color-change-start') {
                    const barOneStyle = arrayBars[barOneIdx as number].style;
                    const barTwoStyle = arrayBars[barTwoVal as number].style;
                    barOneStyle.backgroundColor = ACCENT_COLOR;
                    barTwoStyle.backgroundColor = ACCENT_COLOR;
                } else if (action === 'color-change-revert') {
                    const barOneStyle = arrayBars[barOneIdx as number].style;
                    const barTwoStyle = arrayBars[barTwoVal as number].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                } else if (action === 'swap') {
                    const barStyle = arrayBars[barOneIdx as number].style;
                    barStyle.height = `${barTwoVal}px`;
                }

                if (i === animations.length - 1) {
                    setIsSorting(false);
                     // Final animation to show sorted state
                    for(let k=0; k<arrayBars.length; k++) {
                        setTimeout(() => {
                            arrayBars[k].style.backgroundColor = 'lightgreen';
                        }, k * (101 - animationSpeed));
                    }
                }
            }, i * (101 - animationSpeed));
        }
    };


    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-4xl p-4 mb-4 rounded-lg bg-card border flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <Button onClick={resetArray} disabled={isSorting}>Generate New Array</Button>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <label className="text-sm font-medium whitespace-nowrap">Array Size</label>
                    <Slider
                        value={[numberOfBars]}
                        onValueChange={(value) => setNumberOfBars(value[0])}
                        min={10}
                        max={100}
                        step={1}
                        disabled={isSorting}
                        className="w-full md:w-32"
                    />
                </div>
                 <div className="flex items-center gap-2 w-full md:w-auto">
                    <label className="text-sm font-medium whitespace-nowrap">Speed</label>
                    <Slider
                        value={[animationSpeed]}
                        onValueChange={(value) => setAnimationSpeed(value[0])}
                        min={1}
                        max={100}
                        step={1}
                        disabled={isSorting}
                        className="w-full md:w-32"
                    />
                </div>
                <Select onValueChange={setAlgorithm} defaultValue={algorithm} disabled={isSorting}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select Algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                        <SelectItem value="mergeSort" disabled>Merge Sort (coming soon)</SelectItem>
                        <SelectItem value="quickSort" disabled>Quick Sort (coming soon)</SelectItem>
                        <SelectItem value="heapSort" disabled>Heap Sort (coming soon)</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleSort} disabled={isSorting} className="w-full md:w-auto">Sort!</Button>
            </div>
            <div 
                className="w-full flex justify-center items-end h-[650px] border rounded-lg p-4 bg-card"
                style={{gap: '2px'}}
            >
                {array.map((value, idx) => (
                    <div
                        className="array-bar bg-primary rounded-t-sm"
                        key={idx}
                        style={{
                            height: `${value}px`,
                            width: `${Math.max(800 / numberOfBars - 2, 2)}px`,
                            transition: 'height 0.3s ease-in-out'
                        }}>
                    </div>
                ))}
            </div>
        </div>
    );
}

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
