export function average( ...array: number[]): number {
    let sum = array.reduce((a, b) => a + b, 0);
    return sum / array.length;
}