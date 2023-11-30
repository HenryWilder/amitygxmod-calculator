// Algebra

namespace Algebra {
    export const isEven     = (value: number) => value % 2 == 0;

    export const sum        = (...values: number[]): number => values.reduce((prev, x) => prev + x, 0);
    export const difference = (...values: number[]): number => values.reduce((prev, x) => prev - x);
    export const product    = (...values: number[]): number => values.reduce((prev, x) => prev * x, 1);
    export const remainder  = (numerator: number, denominator: number): number => numerator % denominator;

    export const power = (base:  number, exponent: number): number => Math.pow(base, exponent);
    export const root  = (value: number, base:     number): number => Math.pow(value, 1/base);
    export const log   = (base:  number, argument: number): number => Math.log(argument) / Math.log(base);

    export const gcf = (...values: number[]): number => {
        console.group(`Performing GCF on [${values.join(', ')}]`);
        const absValues = values.map(Math.abs);
        const startValue = Math.min(...absValues);
        console.log(`Starting at ${startValue}`);
        for (let gcf = startValue; gcf > 1; --gcf) {
            if (absValues.every(x => (x % gcf) === 0)) {
                console.log(`All parameters are evenly divisible by ${gcf}`);
                console.groupEnd();
                return gcf;
            }
            console.log(`Not all parameters are evenly divisible by ${gcf}`);
        }
        console.log(`Parameters are not all evenly divisible by any number between ${2}-${startValue} (inclusive). GCF is 1.`);
        console.groupEnd();
        return 1;
    };

    export const lcm = (...values: number[]): number => {
        const absValues = values.map(Math.abs);
        const prod = product(...values);
        for (let lcm = Math.max(...absValues); lcm < prod; ++lcm) {
            if (absValues.every(x => (lcm % x) == 0)) {
                return lcm;
            }
        }
        return prod;
    };

    export interface Fraction {
        numerator: number;
        denominator: number;
    }
    export type SimplifiedFraction = Fraction | number;

    export interface MixedNumber {
        iPart: number;
        fPart: Fraction;
    }

    export interface Radical {
        coefficient: number;
        radicand: number;
    }
    export type SimplifiedRadical = Radical | number;

    export interface RadicalFraction {
        numerator: Radical;
        denominator: number;
    }
    export type SimplifiedRadicalFraction = RadicalFraction | Radical | Fraction | number;

    export const isFractional = (x: any): x is Fraction | RadicalFraction => Object.hasOwn(x, 'numerator') && Object.hasOwn(x, 'denominator');
    export const isFraction = (x: Fraction | RadicalFraction): x is Fraction => typeof x.numerator === "number";

    export const fraction = (numerator: number, denominator: number): SimplifiedFraction => {
        if (denominator === 0) return Infinity;
        if (numerator % denominator === 0) return numerator / denominator;

        const sign = (numerator < 0 !== denominator < 0) ? -1 : 1;

        const numeratorAbs   = Math.abs(numerator);
        const denominatorAbs = Math.abs(denominator);

        const fracGCF = gcf(numeratorAbs, denominatorAbs);
        const frac: Fraction = {
            numerator: sign * numeratorAbs / fracGCF,
            denominator: denominatorAbs / fracGCF
        };
        console.log("fracGCF: " + fracGCF);
        return frac;
    };

    /** @returns If fraction has no whole number part, returns undefined. */
    export const mixedNumber = (frac: Fraction): MixedNumber | undefined => {
        if (frac.denominator === 0 || Math.abs(frac.denominator) > Math.abs(frac.numerator)) return undefined;
        const remainder: number = frac.numerator % frac.denominator;
        if (remainder === 0) return undefined;
        const wholeNumerator: number = frac.numerator - remainder;
        const iPart: number = wholeNumerator / frac.denominator;
        const fPart: Fraction = fraction(remainder, frac.denominator) as Fraction; // remainder being zero implies that the fraction part exists
        return { iPart, fPart };
    };

    // mx²
    export const monomialProduct = (x: number, m: number): number => x * x * m;
    export const radicalSquared = ({ coefficient, radicand }: Radical): number => monomialProduct(coefficient, radicand);
    export const multiplyRadical = ({ coefficient, radicand }: Radical, scale: number): Radical => ({ coefficient: coefficient * scale, radicand });

    export const radical = (coefficient: number, radicand: number): SimplifiedRadical => {
        if (radicand <   0) return NaN; // Complex
        if (radicand === 0) return 0;
        if (radicand === 1) return coefficient;

        // Simple
        const simpleRoot = Math.sqrt(radicand);
        if (Number.isInteger(simpleRoot))
            return coefficient * simpleRoot;

        const n = radicalSquared({ coefficient, radicand });

        // Greatest perfect square
        const gps = factors(n)
            .map(([common, [associated]]) => ({ coefficient: common, radicand: associated }))
            .reduce((prev, x) => {
                for (const [a, b] of [[x.coefficient, x.radicand], [x.radicand, x.coefficient]]) {
                    if (a > (prev.coefficient * prev.coefficient)) {
                        const aRoot = Math.sqrt(a);
                        if (Number.isInteger(aRoot)) {
                            return { coefficient: aRoot, radicand: b };
                        }
                    }
                }
                return prev;
            }, { coefficient: 1, radicand: n });

        return gps; // coefficient of 1 just means radical radicand
    };

    export const radicalFraction = (numerator: Radical, denominator: number): SimplifiedRadicalFraction => {
        const coefficient = fraction(numerator.coefficient, denominator);
        if (isFractional(coefficient)) {
            return {
                numerator: {
                    coefficient: coefficient.numerator,
                    radicand: numerator.radicand
                },
                denominator: coefficient.denominator
            } as RadicalFraction;
        } else if (typeof coefficient === "number") {
            return { coefficient, radicand: numerator.radicand } as Radical;
        } else {
            throw new Error("Not implemented");
        }
    };
    export const fractionalRadical = (numerator: number, denominator: Radical): SimplifiedRadicalFraction => {
        return radicalFraction(multiplyRadical(denominator, numerator), radicalSquared(denominator));
    };

    export type FactorSet = [number, number[]][];
    export const factors = (...values: number[]): FactorSet => {
        const absValues = values.map(Math.abs);
        const factors: FactorSet = [[1, values]];
        const isOneValue = values.length === 1;
        for (let i = 2; (isOneValue ? i*i : i) <= Math.min(...absValues); ++i) {
            if (absValues.every(x => x % i == 0))
                factors.push([i, values.map(x => x / i)]);
        }
        return factors;
    };

    export const isPrime = (n: number): boolean => {
        const absValue = Math.abs(n);
        for (let i = 2; i*i < absValue; ++i) {
            if (absValue % i == 0)
                return false;
        }
        return true;
    };

    export const compare = (a: number, b: number): '=' | '>' | '<' => (a === b) ? '=' : (a > b) ? '>' : '<';

    export const dotProduct = (a: number[], b: number[]): number => {
        if (a.length !== b.length) throw new Error("Cannot dot product different size arrays");
        return sum(...a.map((a_i, i) => a_i * b[i]));
    };

    export const sumOfSquares = (v: number[]): number => dotProduct(v, v);

    export const vectorLength = (v: number[]): SimplifiedRadical => radical(1, sumOfSquares(v));

    export const vectorNormal = (v: number[]): SimplifiedRadicalFraction[] => {
        const mag = vectorLength(v);
        if (typeof mag === "number") {
            return v.map(x => fraction(x, mag));
        } else {
            return v.map(x => fractionalRadical(x, mag));
        }
    };

    export const isNormalized = (v: number[]): boolean => Math.abs(sumOfSquares(v) - 1) <= 0.001;

    export const isPythagorean = (...values: number[]): boolean => {
        const last = values[values.length - 1];

        // a² + b² + c²      = 2c²
        // a² + b² + c² - c² = 2c² - c²
        // a² + b²           =  c²      (which defines pythagorean triple)
        return sumOfSquares(values) === monomialProduct(last, 2);
    }
}

const fractionToString = (frac: Algebra.Fraction): string =>
    `\\frac{${frac.numerator}}{${frac.denominator}}`;

const simplifiedFractionToString = (frac: Algebra.SimplifiedFraction): string =>
    (typeof frac === "number") ? frac.toString() : fractionToString(frac);

const mixedNumberToString = (mixed: Algebra.MixedNumber): string =>
    `${mixed.iPart} ${fractionToString(mixed.fPart)}`;

const radicalToString = (rad: Algebra.Radical): string => {
    let result: string = `\\sqrt{${rad.radicand}}`;
    if (rad.coefficient !== 1) result = rad.coefficient + result;
    return result;
}

const simplifiedRadicalToString = (rad: Algebra.SimplifiedRadical): string =>
    (typeof rad === "number") ? rad.toString() : radicalToString(rad);

const simplifiedRadicalFractionToString = (radFrac: Algebra.SimplifiedRadicalFraction): string => {
    if (typeof radFrac === "number") {
        // number
        return radFrac.toString();
    } else if (Algebra.isFractional(radFrac)) {
        if (Algebra.isFraction(radFrac)) {
            // Fraction
            return fractionToString(radFrac);
        } else {
            // RadicalFraction
            return `\\frac{${radicalToString(radFrac.numerator)}}{${radFrac.denominator}}`;
        }
    } else {
        // Radical
        return radicalToString(radFrac);
    }
};

// IO

const assertiveGetElementById = <T>(id: string): T => {
    const el = document.getElementById(id) as T | null;
    if (el === null) {
        console.error(`${id} is either missing, not of the specified type, or doesn't have the expected ID, "${id}".`);
        throw new Error(`Cannot proceed without the element ${id}.`);
    }
    return el;
};

const stringOrNumberToString = (value: string | number): string => {
    if (typeof value === "number") {
        value = value.toString();
    }
    return value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/Infinity/g, '&infin;')
        .replace(/NaN|undefined|null/g, '&empty;')
        .replace(/_{(.*?)}/g, (_, subscript) => `<sub>${subscript}</sub>`)
        .replace(/\^{(.*?)}/g, (_, superscript) => `<sup>${superscript}</sup>`)
        .replace(/\\sqrt{(.*?)}/g, (_, radicand) => `<span class="radical">&radic;<span><hr><span>${radicand}</span></span></span>`)
        .replace(/\\frac{(.*?)}{(.*?)}/g, (_, numerator, denominator) => `<span class="fraction"><span>${numerator}</span><hr><span>${denominator}</span></span>`)
};

const toggleElementVisible = (element: HTMLElement, isVisible: boolean) => element.classList.toggle("hidden", !isVisible);
const toggleParentVisible = (element: HTMLElement, isVisible: boolean) => toggleElementVisible(element.parentElement!, isVisible);
const toggleButtonEnabled = (button: HTMLButtonElement, isEnabled: boolean) => button.disabled = !isEnabled;

const inputA = assertiveGetElementById<HTMLInputElement>("input-a");
const inputB = assertiveGetElementById<HTMLInputElement>("input-b");
const inputC = assertiveGetElementById<HTMLInputElement>("input-c");
const abcContainer = assertiveGetElementById<HTMLInputElement>("abc-container");

const resultsUnary = assertiveGetElementById<HTMLDivElement>("results-unary");
const unaryOperations = ["quick-insights", "square", "sqrt"] as const;
const unaryResults = Object.fromEntries(unaryOperations.map(what => [what, assertiveGetElementById<HTMLOutputElement>(`unary-${what}`)]));
type UnaryOperation = typeof unaryOperations[number];
const setUnaryResult = (op: UnaryOperation, value: string | number) => unaryResults[op].innerHTML = stringOrNumberToString(value);
unaryOperations.forEach((op) => setUnaryResult(op, '?'));
const unaryFactors = assertiveGetElementById<HTMLElement>("unary-factors");

const resultsBinary = assertiveGetElementById<HTMLDivElement>("results-binary");
const binaryOperations = ["comp", "sum", "diff", "prod", "div", "rem", "pow", "log", "gcf", "lcm"] as const;
const binaryResults = Object.fromEntries(binaryOperations.map(what => [what, assertiveGetElementById<HTMLOutputElement>(`binary-${what}`)]));
type BinaryOperation = typeof binaryOperations[number];
const setBinaryResult = (op: BinaryOperation, value: string | number) => binaryResults[op].innerHTML = stringOrNumberToString(value);
binaryOperations.forEach((op) => setBinaryResult(op, '?'));
const binaryFactors = assertiveGetElementById<HTMLElement>("binary-common-factors");

const resultsTernary = assertiveGetElementById<HTMLDivElement>("results-ternary");
const ternaryOperations = ["quick-insights", "vector", "vector-length", "vector-normal", "sum", "prod", "gcf", "lcm", "quadratic"] as const;
const ternaryResults = Object.fromEntries(ternaryOperations.map(what => [what, assertiveGetElementById<HTMLOutputElement>(`ternary-${what}`)]));
type TernaryOperation = typeof ternaryOperations[number];
const setTernaryResult = (op: TernaryOperation, value: string | number) => ternaryResults[op].innerHTML = stringOrNumberToString(value);
ternaryOperations.forEach((op) => setTernaryResult(op, '?'));
const ternaryFactors = assertiveGetElementById<HTMLElement>("ternary-common-factors");

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

const setFactors = (element: HTMLElement, header: number[], factors: Algebra.FactorSet) => {
    element.innerHTML = "";

    // Header row
    {
        const row = document.createElement('tr');
        element.appendChild(row);

        {
            const factorCell = document.createElement('th');
            row.appendChild(factorCell);
        }

        for (let i = 0; i < header.length; ++i) {
            const cell = document.createElement('th');
            row.appendChild(cell);
            cell.innerText = `${header[i]}`;
            cell.classList.add(abcParamOptions[i]);
        }
    }

    for (const factor of factors) {
        const [fac, parts] = factor;
        const row = document.createElement('tr');
        element.appendChild(row);

        const factorCell = document.createElement('th');
        row.appendChild(factorCell);
        factorCell.innerText = `${fac}`;
        factorCell.classList.add("result");

        for (let i = 0; i < parts.length; ++i) {
            const cell = document.createElement('td');
            row.appendChild(cell);
            cell.innerHTML = `${parts[i]}`;
        }
    }
}

let currentInputCount = 0; // At time of input
let currentValues: string[] = abcParamOptions.map(x => x.toUpperCase()); // At time of calculation

// Disable fractional inputs
[inputA].forEach(input => input.addEventListener("keydown", (event) => {
    if (event.key==='.') event.preventDefault();
}));

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
    setUnaryResult("sqrt", simplifiedRadicalToString(Algebra.radical(1, a)));
    setFactors(unaryFactors, [a], Algebra.factors(a));
};

const runCalculationsBinary = ([a, b]: number[]) => {6
    console.log(`calculate binary for ${a}, ${b}`);
    setBinaryResult("comp", Algebra.compare(a, b));
    setBinaryResult("sum", Algebra.sum(a, b));
    setBinaryResult("diff", Algebra.difference(a, b));
    setBinaryResult("prod", Algebra.product(a, b));
    // Division
    {
        const frac  = Algebra.fraction(a, b);
        let divResult = simplifiedFractionToString(frac);
        const mixed = Algebra.isFractional(frac) ? Algebra.mixedNumber(frac) : undefined;
        if (mixed !== undefined) divResult += " or " + mixedNumberToString(mixed);
        setBinaryResult("div", divResult);
    }
    setBinaryResult("rem", Algebra.remainder(a, b));
    setBinaryResult("pow", Algebra.power(a, b));
    setBinaryResult("log", Algebra.log(a, b));
    setBinaryResult("gcf", Algebra.gcf(a, b));
    setBinaryResult("lcm", Algebra.lcm(a, b));
    setFactors(binaryFactors, [a,b], Algebra.factors(a, b));
};

const runCalculationsTernary = ([a, b, c]: number[]) => {
    console.log(`calculate ternary for ${a}, ${b}, ${c}`);
    const v = [a,b,c];
    const normalizedVectorOrNot = Algebra.isNormalized(v) ? "a unit" : "an unnormalized";
    const pythagoreanTripleOrNot = Algebra.isPythagorean(a,b,c) ? "" : "not";
    setTernaryResult("quick-insights", `${normalizedVectorOrNot} vector ${pythagoreanTripleOrNot} composing a pythagorean triple`);
    setTernaryResult("vector", `(${v.join(', ')})`);
    setTernaryResult("vector-length", simplifiedRadicalToString(Algebra.vectorLength(v)));
    setTernaryResult("vector-normal", `(${Algebra.vectorNormal(v).map(simplifiedRadicalFractionToString).join(', ')})`);
    setTernaryResult("sum", Algebra.sum(a,b,c));
    setTernaryResult("prod", Algebra.product(a,b,c));
    setTernaryResult("gcf", Algebra.gcf(a,b,c));
    setTernaryResult("lcm", Algebra.lcm(a,b,c));
    setFactors(ternaryFactors, [a,b,c], Algebra.factors(a, b, c));
};

const runCalculations = () => {
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
};

runCalculationsButton.addEventListener("click", runCalculations);

abcContainer.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") runCalculations();
});
