export const rand = (max: number, min: number, useFloat?: boolean) => useFloat
    ? Math.random() * (max - min) + min
    : Math.floor(Math.random() * (max - min) + min);

export const clamp = (num: number, hi: number, low: number) => {
    if (num > hi) return hi;
    if (num < low) return low;
    return num;
}