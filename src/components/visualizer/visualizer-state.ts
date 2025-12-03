
import type { AnimationStep } from '@/lib/algorithms';

export type State = {
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

export type Action =
  | { type: 'SET_CONFIG'; payload: Partial<Omit<State, 'array' | 'animations'>> }
  | { type: 'START_SORT'; payload: { array: number[], animations: AnimationStep[] } }
  | { type: 'PAUSE_RESUME' }
  | { type: 'STEP_FORWARD' }
  | { type: 'STEP_BACKWARD' }
  | { type: 'RESET'; payload: { array: number[], numberOfBars: number } }
  | { type: 'SORT_COMPLETE' };

export const initialStateFactory = (numberOfBars: number): State => ({
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

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, ...action.payload };
    case 'START_SORT':
      return {
        ...state,
        array: action.payload.array,
        animations: action.payload.animations,
        currentStep: -1, // Start at -1 so first step is 0
        isSorting: true,
        isPaused: false,
        isSorted: false,
      };
    case 'PAUSE_RESUME':
      // If we are starting to sort from scratch, and we hit play, we should not be paused.
      if (state.currentStep === -1 && !state.isPaused) {
        return { ...state, isPaused: false };
      }
      return { ...state, isPaused: !state.isPaused };
    case 'STEP_FORWARD':
        if(state.currentStep >= state.animations.length - 1) {
            return { ...state, isSorting: false, isPaused: true, isSorted: true };
        }
      return { ...state, currentStep: state.currentStep + 1, isPaused: true };
    case 'STEP_BACKWARD':
        if (state.currentStep <= 0) return { ...state, currentStep: -1, isPaused: true };
        return { ...state, currentStep: state.currentStep - 1, isPaused: true };
    case 'RESET':
      return {
        ...initialStateFactory(action.payload.numberOfBars),
        array: action.payload.array,
        numberOfBars: action.payload.numberOfBars,
        animationSpeed: state.animationSpeed,
        algorithm: state.algorithm,
      };
    case 'SORT_COMPLETE':
      return { ...state, isSorting: false, isPaused: true, isSorted: true };
    default:
      return state;
  }
}
