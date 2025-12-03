
import { SortingVisualizer } from "@/components/visualizer/sorting-visualizer";

export default function VisualizerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Sorting Algorithm Visualizer
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Watch sorting algorithms in action.
        </p>
      </header>
      <SortingVisualizer />
    </div>
  );
}
