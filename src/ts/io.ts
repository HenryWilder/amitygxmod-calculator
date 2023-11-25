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

const resultsUnary = assertiveGetElementById<HTMLDivElement>("results-unary");
const resultsBinary = assertiveGetElementById<HTMLDivElement>("results-binary");
const resultsTernary = assertiveGetElementById<HTMLDivElement>("results-ternary");
const resultsContainer = assertiveGetElementById<HTMLDivElement>("results-container");

const runCalculationsButton = assertiveGetElementById<HTMLButtonElement>("run-calculations-button");

let currentInputCount = 0;
abcContainer.addEventListener("input", () => {
    let values: (string)[] = [];
    for (const el of [inputA, inputB, inputC]) {
        const value: string = el.value;
        if (value !== "") values.push(value);
    }

    const inputCount = values.length;
    if (inputCount === currentInputCount) return; // Only continue if there was a change
    currentInputCount = inputCount;

    [inputA.value, inputB.value, inputC.value] = [values[0] ?? "", values[1] ?? "", values[2] ?? ""];
    toggleParentVisible(inputB, inputCount >= 1);
    toggleParentVisible(inputC, inputCount >= 2);

    toggleButtonEnabled(runCalculationsButton, inputCount !== 0);

    toggleElementVisible(resultsUnary, inputCount === 1);
    toggleElementVisible(resultsBinary, inputCount === 2);
    toggleElementVisible(resultsTernary, inputCount === 3);
});

const runCalculationsUnary = (a: number) => {
    console.log(`calculate unary for ${a}`);
};

const runCalculationsBinary = (a: number, b: number) => {
    console.log(`calculate binary for ${a}, ${b}`);
};

const runCalculationsTernary = (a: number, b: number, c: number) => {
    console.log(`calculate ternary for ${a}, ${b}, ${c}`);
};

runCalculationsButton.addEventListener("click", () => {
    switch (currentInputCount) {
        case 0: console.log("error"); break;
        case 1: runCalculationsUnary(Number(inputA.value)); break;
        case 2: runCalculationsBinary(Number(inputA.value), Number(inputB.value)); break;
        case 3: runCalculationsTernary(Number(inputA.value), Number(inputB.value), Number(inputC.value)); break;
    }
});
