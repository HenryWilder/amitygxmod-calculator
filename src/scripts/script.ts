// Algebra

namespace Algebra {
    export const isEven     = (value: number) => value % 2 == 0;

    export const sum        = (...values: number[]): number => values.reduce((prev, x) => prev + x, 0);
    export const difference = (...values: number[]): number => values.reduce((prev, x) => prev - x);
    export const product    = (...values: number[]): number => values.reduce((prev, x) => prev * x, 1);
    export const quotient   = (...values: number[]): number => values.reduce((prev, x) => prev / x);
    export const remainder  = (...values: number[]): number => values.reduce((prev, x) => prev % x);

    export const power = (base: number, exponent: number): number => Math.pow(base, exponent);
    export const root = (value: number, base: number): number => Math.pow(value, 1/base);

    export const gcf = (...values: number[]): number => {
        const absValues = values.map(Math.abs);
        for (let gcf = Math.min(...absValues); gcf > 1; --gcf) {
            if (absValues.every(x => gcf % x === 0))
                return gcf;
        }
        return 1;
    };

    export const lcm = (...values: number[]): number => {
        const absValues = values.map(Math.abs);
        const product = values.reduce((prev, x) => prev * x, 1);
        for (let lcm = Math.max(...absValues); lcm < product; ++lcm) {
            if (absValues.every(x => lcm % x == 0))
                return lcm;
        }
        return product;
    };

    export const factors = (...values: number[]): [number, number[]][] => {
        const absValues = values.map(Math.abs);
        const factors: [number, number[]][] = [[1, values]];
        for (let i = 2; i <= Math.min(...absValues); ++i) {
            if (absValues.every(x => x % i == 0))
                factors.push([i, values.map(x => x / i)]);
        }
        return factors;
    };

    export const isPrime = (n: number): boolean => {
        const absValue = Math.abs(n);
        for (let i = 2; i < absValue; ++i) {
            if (absValue % i == 0)
                return false;
        }
        return true;
    };

    export const compare = (a: number, b: number): '=' | '>' | '<' => (a === b) ? '=' : (a > b) ? '>' : '<';
}

// IO

const assertiveGetElementById = <T>(id: string): T => {
    const el = document.getElementById(id) as T | null;
    if (el === null) {
        console.error(`${id} is either missing, not of the specified type, or doesn't have the expected ID, "${id}".`);
        throw new Error(`Cannot proceed without the element ${id}.`);
    }
    return el;
};

const toggleElementVisible = (element: HTMLElement, isVisible: boolean) => element.classList.toggle("hidden", !isVisible);
const toggleParentVisible = (element: HTMLElement, isVisible: boolean) => toggleElementVisible(element.parentElement!, isVisible);
const toggleButtonEnabled = (button: HTMLButtonElement, isEnabled: boolean) => button.disabled = !isEnabled;

const inputA = assertiveGetElementById<HTMLInputElement>("input-a");
const inputB = assertiveGetElementById<HTMLInputElement>("input-b");
const inputC = assertiveGetElementById<HTMLInputElement>("input-c");
const abcContainer = assertiveGetElementById<HTMLInputElement>("abc-container");

// const toCamelCase = (str: string) => str.replace(/-([a-z])/, (_, ch: string) => ch.toUpperCase());

const resultsUnary = assertiveGetElementById<HTMLDivElement>("results-unary");
const unaryOperations = ["quick-insights", "square", "sqrt", "factors"] as const;
const unaryResults = Object.fromEntries(unaryOperations.map(what => [what, assertiveGetElementById<HTMLOutputElement>(`unary-${what}`)]));
type UnaryOperation = typeof unaryOperations[number];
const setUnaryResult = (op: UnaryOperation, value: string | number) => unaryResults[op].value = value.toString();
unaryOperations.forEach((op) => setUnaryResult(op, '?'));

const resultsBinary = assertiveGetElementById<HTMLDivElement>("results-binary");
const binaryOperations = ["comp", "sum", "diff", "prod", "div", "rem", "pow", "gcf", "lcm", "common-factors"] as const;
const binaryResults = Object.fromEntries(binaryOperations.map(what => [what, assertiveGetElementById<HTMLOutputElement>(`binary-${what}`)]));
type BinaryOperation = typeof binaryOperations[number];
const setBinaryResult = (op: BinaryOperation, value: string | number) => binaryResults[op].value = value.toString();
binaryOperations.forEach((op) => setBinaryResult(op, '?'));

const resultsTernary = assertiveGetElementById<HTMLDivElement>("results-ternary");
const ternaryOperations = ["vector-length", "vector-length", "vector-normal", "sum", "prod", "gcf", "lcm", "polynomial", "common-factors"] as const;
const ternaryResults = Object.fromEntries(ternaryOperations.map(what => [what, assertiveGetElementById<HTMLOutputElement>(`ternary-${what}`)]));
type TernaryOperation = typeof ternaryOperations[number];
const setTernaryResult = (op: TernaryOperation, value: string | number) => ternaryResults[op].value = value.toString();
ternaryOperations.forEach((op) => setTernaryResult(op, '?'));

const resultsContainer = assertiveGetElementById<HTMLDivElement>("results-container");

const runCalculationsButton = assertiveGetElementById<HTMLButtonElement>("run-calculations-button");

const abcParamOptions = ['a','b','c'] as const;
type ABCParam = typeof abcParamOptions[number];

const abcParams = Object.fromEntries(
    abcParamOptions.map((key: ABCParam) =>
        [key, Array.from(document.querySelectorAll<HTMLOutputElement>(`output.param.${key}`))]));

const markParamsDirty = (key: ABCParam, isDirty = true) => {
    abcParams[key].forEach(el => el.classList.toggle("dirty", isDirty));
}

const setParamsValues = (key: ABCParam, value: string) => {
    abcParams[key].forEach(el => el.value = value);
}

abcParamOptions.forEach(key => setParamsValues(key, key.toUpperCase()));

let currentInputCount = 0; // At time of input
let currentValues: string[] = abcParamOptions.map(x => x.toUpperCase()); // At time of calculation

abcContainer.addEventListener("input", () => {
    let values: string[] = [inputA, inputB, inputC]
        .map(el => el.value)
        .filter(value => value !== "");

    const inputCount = values.length;
    const changes: boolean[] = abcParamOptions.map((_, i) => values[i] !== currentValues[i]);
    abcParamOptions.forEach((x, i) => markParamsDirty(x, changes[i]));

    const isResultIdentical: boolean = changes.every(x => !x);
    toggleButtonEnabled(runCalculationsButton, inputCount !== 0 && !isResultIdentical);

    if (inputCount === currentInputCount) return; // Only continue if the number of inputs changed
    currentInputCount = inputCount;

    [inputA.value, inputB.value, inputC.value] = [values[0] ?? "", values[1] ?? "", values[2] ?? ""];
    toggleParentVisible(inputB, inputCount >= 1);
    toggleParentVisible(inputC, inputCount >= 2);

    toggleElementVisible(resultsUnary, inputCount === 1);
    toggleElementVisible(resultsBinary, inputCount === 2);
    toggleElementVisible(resultsTernary, inputCount === 3);
});

const runCalculationsUnary = ([a]: number[]) => {
    console.log(`calculate unary for ${a}`);
    const evenOrOdd = Algebra.isEven(a) ? "even" : "odd";
    const compositeOrPrime = Algebra.isPrime(a) ? "prime" : "composite";
    setUnaryResult("quick-insights", `an ${evenOrOdd} ${compositeOrPrime}`);
    setUnaryResult("square", Algebra.power(a, 2));
    setUnaryResult("sqrt", Algebra.root(a, 2));
};

const runCalculationsBinary = ([a, b]: number[]) => {
    console.log(`calculate binary for ${a}, ${b}`);
    setBinaryResult("comp", Algebra.compare(a, b));
    setBinaryResult("sum", Algebra.sum(a, b));
    setBinaryResult("diff", Algebra.difference(a, b));
    setBinaryResult("prod", Algebra.product(a, b));
    setBinaryResult("div", Algebra.quotient(a, b));
    setBinaryResult("rem", Algebra.remainder(a, b));
    setBinaryResult("pow", Algebra.power(a, b));
    setBinaryResult("gcf", Algebra.gcf(a, b));
    setBinaryResult("lcm", Algebra.lcm(a, b));
    setBinaryResult("common-factors", Algebra.factors(a, b).map((x) => `${x}`).join('\n'));
};

const runCalculationsTernary = ([a, b, c]: number[]) => {
    console.log(`calculate ternary for ${a}, ${b}, ${c}`);
};

runCalculationsButton.addEventListener("click", () => {
    abcParamOptions.forEach(key => markParamsDirty(key, false));
    currentValues = [inputA, inputB, inputC].map(x => x.value).filter(value => value !== "");
    const currentNumValues = currentValues.map(value => Number(value));
    abcParamOptions.forEach((key, index) => setParamsValues(key, "" + (currentNumValues[index] ?? key.toUpperCase())));
    toggleButtonEnabled(runCalculationsButton, false);
    switch (currentInputCount) {
        case 0: console.log("error"); break; // Shouldn't be possible when the button is disabled
        case 1: runCalculationsUnary(currentNumValues); break;
        case 2: runCalculationsBinary(currentNumValues); break;
        case 3: runCalculationsTernary(currentNumValues); break;
    }
});
