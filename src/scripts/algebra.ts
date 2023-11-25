export const sum        = (...values: number[]) => values.reduce((prev, x) => prev + x);
export const difference = (...values: number[]) => values.reduce((prev, x) => prev - x);
export const product    = (...values: number[]) => values.reduce((prev, x) => prev * x);
export const quotient   = (...values: number[]) => values.reduce((prev, x) => prev / x);
export const remainder  = (...values: number[]) => values.reduce((prev, x) => prev % x);
export const power      = (...values: number[]) => values.reduce((prev, x) => Math.pow(prev, x));
