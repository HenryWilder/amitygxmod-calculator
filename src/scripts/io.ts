import * as Algebra from './algebra';

const assertiveGetElementById = <T>(id: string): T => {
    const el = document.getElementById(id) as T | null;
    if (el === null) {
        console.error(`${id} is either missing, not of the specified type, or doesn't have the expected ID, "${id}".`);
        throw new Error(`Cannot proceed without the element ${id}.`);
    }
    return el;
};

const toggleElementVisible = (element: HTMLElement, isVisible: boolean) => element.classList.toggle("hidden", !isVisible);
const hideElementVisible = (element: HTMLElement) => toggleElementVisible(element, false);
const showElementVisible = (element: HTMLElement) => toggleElementVisible(element, true);

const toggleParentVisible = (element: HTMLElement, isVisible: boolean) => toggleElementVisible(element.parentElement!, isVisible);
const hideParentVisible = (element: HTMLElement) => toggleParentVisible(element, false);
const showParentVisible = (element: HTMLElement) => toggleParentVisible(element, true);

const toggleButtonEnabled = (button: HTMLButtonElement, isEnabled: boolean) => button.disabled = !isEnabled;
const disableButton = (button: HTMLButtonElement) => toggleButtonEnabled(button, false);
const enableButton  = (button: HTMLButtonElement) => toggleButtonEnabled(button, true);

const inputA = assertiveGetElementById<HTMLInputElement>("input-a");
const inputB = assertiveGetElementById<HTMLInputElement>("input-b");
const inputC = assertiveGetElementById<HTMLInputElement>("input-c");
const abcContainer = assertiveGetElementById<HTMLInputElement>("abc-container");

const toCamelCase = (str: string) => str.replace(/-([a-z])/, (_, ch: string) => ch.toUpperCase());

const resultsUnary = assertiveGetElementById<HTMLDivElement>("results-unary");
const unaryOperations = ["quick-insights", "square", "sqrt", "factors"] as const;
const unaryResults = Object.fromEntries(unaryOperations.map(what => [toCamelCase(what), assertiveGetElementById<HTMLOutputElement>(`unary-${what}`)]));

const resultsBinary = assertiveGetElementById<HTMLDivElement>("results-binary");
const binaryOperations = ["sum", "diff", "prod", "div", "rem", "pow", "gcf", "lcm", "common-factors"] as const;
const binaryResults = Object.fromEntries(binaryOperations.map(what => [toCamelCase(what), assertiveGetElementById<HTMLOutputElement>(`binary-${what}`)]));

const resultsTernary = assertiveGetElementById<HTMLDivElement>("results-ternary");
const ternaryOperations = ["vector-length", "vector-length", "vector-normal", "sum", "prod", "gcf", "lcm", "polynomial", "common-factors"] as const;
const ternaryResults = Object.fromEntries(ternaryOperations.map(what => [toCamelCase(what), assertiveGetElementById<HTMLOutputElement>(`ternary-${what}`)]));

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
    console.log(`${values} is ${isResultIdentical ? "" : "not "}identical to ${currentValues}`);
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
    unaryResults.quickInsights.value = "Hello world!";
};

const runCalculationsBinary = ([a, b]: number[]) => {
    console.log(`calculate binary for ${a}, ${b}`);
};

const runCalculationsTernary = ([a, b, c]: number[]) => {
    console.log(`calculate ternary for ${a}, ${b}, ${c}`);
};

runCalculationsButton.addEventListener("click", () => {
    abcParamOptions.forEach(key => markParamsDirty(key, false));
    currentValues = [inputA, inputB, inputC].map(x => x.value).filter(value => value !== "");
    const currentNumValues = currentValues.map(value => Number(value));
    abcParamOptions.forEach((key, index) => setParamsValues(key, "" + currentNumValues[index]));
    toggleButtonEnabled(runCalculationsButton, false);
    switch (currentInputCount) {
        case 0: console.log("error"); break; // Shouldn't be possible when the button is disabled
        case 1: runCalculationsUnary(currentNumValues); break;
        case 2: runCalculationsBinary(currentNumValues); break;
        case 3: runCalculationsTernary(currentNumValues); break;
    }
});
