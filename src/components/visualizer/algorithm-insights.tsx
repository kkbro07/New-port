
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const insightsData: any = {
    bubbleSort: {
        time: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        characteristics: [
            "Simple implementation",
            "Stable sorting algorithm",
            "In-place sorting",
            "Good for small or mostly sorted datasets",
        ],
    },
    selectionSort: {
        time: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        characteristics: [
            "Simple implementation",
            "Not stable",
            "In-place sorting",
            "Performs minimum number of swaps",
        ],
    },
    insertionSort: {
        time: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        characteristics: [
            "Efficient for small datasets",
            "Stable sorting algorithm",
            "In-place sorting",
            "Adaptive: efficient for partially sorted data",
        ],
    },
    mergeSort: {
        time: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
        },
        characteristics: [
            "Guaranteed O(n log n) performance",
            "Stable sorting algorithm",
            "Not in-place (requires extra space)",
            "Excellent for large datasets and external sorting",
        ],
    },
    quickSort: {
        time: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)",
        },
        characteristics: [
            "Very efficient on average",
            "Not stable",
            "In-place (with good implementation)",
            "Widely used in practice",
        ],
    },
    heapSort: {
        time: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
        },
        characteristics: [
            "Consistent O(n log n) performance",
            "Not stable",
            "In-place sorting",
            "Good for real-time systems where worst-case is important",
        ],
    },
    cocktailSort: {
        time: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        characteristics: [
            "Variant of Bubble Sort",
            "Stable sorting algorithm",
            "In-place sorting",
            "Slightly better than Bubble Sort",
        ],
    },
    shellSort: {
        time: {
            best: "O(n log n)",
            average: "Depends on gap sequence",
            worst: "O(n (log n)²)",
        },
        characteristics: [
            "Improvement over Insertion Sort",
            "Not stable",
            "In-place sorting",
            "Complex to analyze",
        ],
    },
};

const comparisonData = [
    { name: "Bubble Sort", best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "✓" },
    { name: "Selection Sort", best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "✗" },
    { name: "Insertion Sort", best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "✓" },
    { name: "Quick Sort", best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: "✗" },
    { name: "Merge Sort", best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: "✓" },
    { name: "Heap Sort", best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)", stable: "✗" },
    { name: "Shell Sort", best: "O(n log n)", average: "O(n (log n)²) or O(n³⁄₂)", worst: "O(n (log n)²) or O(n²)", space: "O(1)", stable: "✗" },
    { name: "Cocktail Sort", best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "✓" },
];

export function AlgorithmInsights({ algorithm }: { algorithm: string }) {
    const data = insightsData[algorithm] || insightsData.bubbleSort;

    return (
        <div className="mt-8 w-full max-w-5xl mx-auto space-y-8">

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Time Complexity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><span className="font-medium text-foreground">Best Case:</span> {data.time.best}</p>
                        <p><span className="font-medium text-foreground">Average Case:</span> {data.time.average}</p>
                        <p><span className="font-medium text-foreground">Worst Case:</span> {data.time.worst}</p>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Characteristics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-1 text-sm list-disc pl-5">
                            {data.characteristics.map((char: string) => <li key={char}>{char}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="bg-secondary/30">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline tracking-tight text-center">
                    Algorithm Comparison
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Algorithm</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold">Best</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold">Average</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold">Worst</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold">Space</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold">Stable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((algo) => (
                                    <tr key={algo.name} className="border-b last:border-b-0">
                                        <td className="px-4 py-2 text-sm font-medium">{algo.name}</td>
                                        <td className="px-4 py-2 text-center text-sm text-green-500">{algo.best}</td>
                                        <td className="px-4 py-2 text-center text-sm text-yellow-500">{algo.average}</td>
                                        <td className="px-4 py-2 text-center text-sm text-red-500">{algo.worst}</td>
                                        <td className="px-4 py-2 text-center text-sm">{algo.space}</td>
                                        <td className="px-4 py-2 text-center text-sm">{algo.stable}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-secondary/30 p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-headline text-2xl tracking-tight">Master Sorting Algorithms Visually</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-muted-foreground">
                    <p className="mb-6">Our tool helps you understand how sorting algorithms work through animated demonstrations. Whether you're a student, preparing for interviews, or a developer, this tool makes learning intuitive.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Visual Learning</h4>
                            <p className="text-sm">See exactly how elements move and compare during the sorting process.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Step-by-Step Control</h4>
                            <p className="text-sm">Pause, play, and step through each operation to understand the logic.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Performance Comparison</h4>
                            <p className="text-sm">Understand why some algorithms are faster or more memory-efficient.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Custom Testing</h4>
                            <p className="text-sm">Try your own datasets to see how algorithms perform in different scenarios.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>


            <Card className="bg-secondary/30 p-8">
                <h3 className="mb-6 text-xl font-bold">Frequently Asked Questions</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="mb-2 font-semibold">What is the best sorting algorithm?</h4>
                        <p className="text-sm text-muted-foreground">There's no single "best" algorithm. Quick Sort is generally fastest for average cases (O(n log n)), while Merge Sort guarantees O(n log n) performance. For small datasets, Insertion Sort can be optimal. Use our visualization tool to see how each performs with different data.</p>
                    </div>
                    <div>
                        <h4 className="mb-2 font-semibold">How do I choose a sorting algorithm?</h4>
                        <p className="text-sm text-muted-foreground">Consider your data size, whether stability matters (preserving order of equal elements), memory constraints, and whether data is partially sorted. Our comparison table shows time/space complexity and stability for each algorithm.</p>
                    </div>
                    <div>
                        <h4 className="mb-2 font-semibold">What does O(n log n) mean?</h4>
                        <p className="text-sm text-muted-foreground">Big O notation describes how an algorithm's runtime grows with input size. O(n log n) means the time increases proportionally to n × log(n). This is more efficient than O(n²) for large datasets but slower than O(n) linear time.</p>
                    </div>
                    <div>
                        <h4 className="mb-2 font-semibold">Can I use custom data in the visualizer?</h4>
                        <p className="text-sm text-muted-foreground">Yes! Click the "Custom Array" button and enter up to 15 numbers separated by commas. This lets you test specific scenarios like already-sorted data, reverse-sorted data, or datasets with many duplicates.</p>
                    </div>
                </div>
            </Card>

        </div>
    );
}
