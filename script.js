System.register("scripts/algebra", [], function (exports_1, context_1) {
    "use strict";
    var sum, difference, product, quotient, remainder, power;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("sum", sum = (...values) => values.reduce((prev, x) => prev + x));
            exports_1("difference", difference = (...values) => values.reduce((prev, x) => prev - x));
            exports_1("product", product = (...values) => values.reduce((prev, x) => prev * x));
            exports_1("quotient", quotient = (...values) => values.reduce((prev, x) => prev / x));
            exports_1("remainder", remainder = (...values) => values.reduce((prev, x) => prev % x));
            exports_1("power", power = (...values) => values.reduce((prev, x) => Math.pow(prev, x)));
        }
    };
});
System.register("scripts/io", [], function (exports_2, context_2) {
    "use strict";
    var assertiveGetElementById, toggleElementVisible, hideElementVisible, showElementVisible, toggleParentVisible, hideParentVisible, showParentVisible, toggleButtonEnabled, disableButton, enableButton, inputA, inputB, inputC, abcContainer, resultsUnary, resultsBinary, resultsTernary, resultsContainer, runCalculationsButton, abcParamOptions, abcParams, markParamsDirty, setParamsValues, currentInputCount, currentValues, runCalculationsUnary, runCalculationsBinary, runCalculationsTernary;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            assertiveGetElementById = (id) => {
                const el = document.getElementById(id);
                if (el === null) {
                    console.error(`${id} is either missing, not of the specified type, or doesn't have the expected ID, "${id}".`);
                    throw new Error(`Cannot proceed without the element ${id}.`);
                }
                return el;
            };
            toggleElementVisible = (element, isVisible) => element.classList.toggle("hidden", !isVisible);
            hideElementVisible = (element) => toggleElementVisible(element, false);
            showElementVisible = (element) => toggleElementVisible(element, true);
            toggleParentVisible = (element, isVisible) => toggleElementVisible(element.parentElement, isVisible);
            hideParentVisible = (element) => toggleParentVisible(element, false);
            showParentVisible = (element) => toggleParentVisible(element, true);
            toggleButtonEnabled = (button, isEnabled) => button.disabled = !isEnabled;
            disableButton = (button) => toggleButtonEnabled(button, false);
            enableButton = (button) => toggleButtonEnabled(button, true);
            inputA = assertiveGetElementById("input-a");
            inputB = assertiveGetElementById("input-b");
            inputC = assertiveGetElementById("input-c");
            abcContainer = assertiveGetElementById("abc-container");
            resultsUnary = assertiveGetElementById("results-unary");
            resultsBinary = assertiveGetElementById("results-binary");
            resultsTernary = assertiveGetElementById("results-ternary");
            resultsContainer = assertiveGetElementById("results-container");
            runCalculationsButton = assertiveGetElementById("run-calculations-button");
            abcParamOptions = ['a', 'b', 'c'];
            abcParams = Object.fromEntries(abcParamOptions.map((key) => [key, Array.from(document.querySelectorAll(`output.param.${key}`))]));
            markParamsDirty = (key, isDirty = true) => {
                abcParams[key].forEach(el => el.classList.toggle("dirty", isDirty));
            };
            setParamsValues = (key, value) => {
                abcParams[key].forEach(el => el.value = value);
            };
            abcParamOptions.forEach(key => setParamsValues(key, key.toUpperCase()));
            currentInputCount = 0; // At time of input
            currentValues = abcParamOptions.map(x => x.toUpperCase()); // At time of calculation
            abcContainer.addEventListener("input", () => {
                var _a, _b, _c;
                let values = [inputA, inputB, inputC]
                    .map(el => el.value)
                    .filter(value => value !== "");
                const inputCount = values.length;
                abcParamOptions.forEach((x, i) => {
                    markParamsDirty(x, values[i] !== currentValues[i]);
                });
                if (inputCount === currentInputCount)
                    return; // Only continue if there was a change
                currentInputCount = inputCount;
                [inputA.value, inputB.value, inputC.value] = [(_a = values[0]) !== null && _a !== void 0 ? _a : "", (_b = values[1]) !== null && _b !== void 0 ? _b : "", (_c = values[2]) !== null && _c !== void 0 ? _c : ""];
                toggleParentVisible(inputB, inputCount >= 1);
                toggleParentVisible(inputC, inputCount >= 2);
                toggleButtonEnabled(runCalculationsButton, inputCount !== 0);
                toggleElementVisible(resultsUnary, inputCount === 1);
                toggleElementVisible(resultsBinary, inputCount === 2);
                toggleElementVisible(resultsTernary, inputCount === 3);
            });
            runCalculationsUnary = ([a]) => {
                console.log(`calculate unary for ${a}`);
            };
            runCalculationsBinary = ([a, b]) => {
                console.log(`calculate binary for ${a}, ${b}`);
            };
            runCalculationsTernary = ([a, b, c]) => {
                console.log(`calculate ternary for ${a}, ${b}, ${c}`);
            };
            runCalculationsButton.addEventListener("click", () => {
                abcParamOptions.forEach(key => markParamsDirty(key, false));
                currentValues = [inputA, inputB, inputC].map(x => x.value);
                const currentNumValues = currentValues.map(value => Number(value));
                currentValues.forEach((value, index) => setParamsValues(abcParamOptions[index], value));
                switch (currentInputCount) {
                    case 0:
                        console.log("error");
                        break; // Shouldn't be possible when the button is disabled
                    case 1:
                        runCalculationsUnary(currentNumValues);
                        break;
                    case 2:
                        runCalculationsBinary(currentNumValues);
                        break;
                    case 3:
                        runCalculationsTernary(currentNumValues);
                        break;
                }
            });
        }
    };
});
