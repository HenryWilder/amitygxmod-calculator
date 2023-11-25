const assertiveGetElementById = <T>(id: string): T => {
    const el = document.getElementById(id) as T | null;
    if (el === null) {
        console.error(`${id} is either missing, not of the specified type, or doesn't have the expected ID, "${id}".`);
        throw new Error(`Cannot proceed without the element ${id}.`);
    }
    return el;
};

const toggleElement = (element: HTMLElement, isVisible: boolean) => element.classList.toggle("hidden", !isVisible);
const hideElement = (element: HTMLElement) => toggleElement(element, false);
const showElement = (element: HTMLElement) => toggleElement(element, true);

const toggleParent = (element: HTMLElement, isVisible: boolean) => toggleElement(element.parentElement!, isVisible);
const hideParent = (element: HTMLElement) => toggleParent(element, false);
const showParent = (element: HTMLElement) => toggleParent(element, true);

const inputA = assertiveGetElementById<HTMLInputElement>("input-a");
const inputB = assertiveGetElementById<HTMLInputElement>("input-b");
const inputC = assertiveGetElementById<HTMLInputElement>("input-c");
const abcContainer = assertiveGetElementById<HTMLInputElement>("abc-container");

const resultsUnary = assertiveGetElementById<HTMLDivElement>("results-unary");
const resultsBinary = assertiveGetElementById<HTMLDivElement>("results-binary");
const resultsTernary = assertiveGetElementById<HTMLDivElement>("results-ternary");
const resultsContainer = assertiveGetElementById<HTMLDivElement>("results-container");

let lastInputCount = 0;
abcContainer.addEventListener("input", () => {
    let values: (string)[] = [];
    for (const el of [inputA, inputB, inputC]) {
        const value: string = el.value;
        if (value !== "") values.push(value);
    }

    const inputCount = values.length;

    if (inputCount === lastInputCount) return; // Only if there was a change

    console.log(`Changed from ${lastInputCount} to ${inputCount}`);

    inputA.value = values[0] ?? "";
    inputB.value = values[1] ?? "";
    inputC.value = values[2] ?? "";
    toggleParent(inputB, inputCount >= 1);
    toggleParent(inputC, inputCount >= 2);

    lastInputCount = inputCount;
});
