const screenDisplay = document.getElementById('main-display').querySelector('p');
const currentOperation = document.getElementById('current-operation').querySelector('p');
let operator;
let displayValue = '';
let currentTotal;
let numberPressed;
let operatorPressed;
let calculation;
let clear;


buttons = document.querySelectorAll('.button');
buttons.forEach(node => node.addEventListener('click', clickInput));
window.addEventListener('keydown', keyInput)

function clickInput(e) {
    const button = e.currentTarget;
    routeToButtons(button);
}

function keyInput(e) {
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    routeToButtons(button);
}

function routeToButtons(button) {
    let buttonValue = button.getAttribute('data-value');
    let buttonClass = button.getAttribute('class');
    if (buttonClass === 'button function') {
        runFunction(buttonValue, buttonClass);
    } else if (buttonClass === 'button operator' && displayValue)  {  
        runOperator(buttonValue);
        operatorPressed = 1;
        numberPressed = 0;
    } else if (buttonClass === 'button number') {
        if (currentOperation.innerHTML.split(' ').length === 3) {
            clearCalc();
            clear = 1;
            printDisplay(buttonValue, clear);
        } else if (!operatorPressed) {
            printDisplay(buttonValue);
        } else if (operatorPressed) {
            operatorPressed = 0;
            screenDisplay.innerHTML = '';
            printDisplay(buttonValue);   
        }
        numberPressed = 1;
    }
}

function printDisplay(value, clear) {
    if (clear) {
        screenDisplay.innerHTML = value;
        displayValue = screenDisplay.innerHTML;
        clear = 0;
    } else {
        screenDisplay.innerHTML += value;
        displayValue = screenDisplay.innerHTML;
    }
    if (screenDisplay.innerHTML.length > 9) {
        screenDisplay.innerHTML = screenDisplay.innerHTML.slice(0, 9);
        displayValue = screenDisplay.innerHTML;
    }
}

function printCurrent(buttonValue) {
    currentOperation.innerHTML = displayValue + ' ' + buttonValue;
}

function runOperator(buttonValue) {      
    if (!operator || !numberPressed) { 
        printCurrent(buttonValue);
        operator = buttonValue;
    } else if (numberPressed) {
        currentTotal = currentOperation.innerHTML.split(' ')[0];
        calculateDisplayValue();
        operator = buttonValue;
        currentOperation.innerHTML = screenDisplay.innerHTML + ' ' + operator;
    }
}

function runFunction(buttonValue, buttonClass) {
    if (buttonValue === 'equals') {
        equals();
    }
    if (buttonValue === 'clear') {
        clearCalc();
    }
    if (buttonValue === 'delete') {
        backspace();
    }
}

function clearCalc() {
    operator = undefined;
    displayValue = undefined;
    currentTotal = undefined;
    numberPressed = undefined;
    operatorPressed = undefined;
    calculation = undefined;
    clear = undefined;
    currentOperation.innerHTML = '';
    screenDisplay.innerHTML = '';
}

function backspace() {
    if (screenDisplay.innerHTML.split('').length === 1) {
        screenDisplay.innerHTML = screenDisplay.innerHTML.slice(0, -1);
        displayValue = currentOperation.innerHTML.split(' ')[0];
    } else {
        screenDisplay.innerHTML = screenDisplay.innerHTML.slice(0, -1);
        displayValue = screenDisplay.innerHTML;
    }
}

function equals() {
    if (operator) {
        if (currentOperation.innerHTML.split(' ').length === 3) {
            numberPressed = 0;
            currentTotal = screenDisplay.innerHTML;
            displayValue = currentOperation.innerHTML.split(' ')[2]
            currentOperation.innerHTML = currentTotal + ' ' + currentOperation.innerHTML.split(' ')[1] + ' ' + displayValue;
            calculateDisplayValue();
        } else {
            numberPressed = 0;
            currentTotal = currentOperation.innerHTML.split(' ')[0];
            currentOperation.innerHTML = currentOperation.innerHTML + ' ' + displayValue;
            calculateDisplayValue();
        }
        clear = 1;
    }
}

function calculateDisplayValue() {
    currentTotal = Number(currentTotal);
    displayValue = Number(displayValue);
    console.log(currentTotal+operator+displayValue);
    if (operator === '÷') {
        calculation = operate(divide, currentTotal, displayValue);
    } else if (operator === '×') {
        calculation = operate(multiply, currentTotal, displayValue);
    } else if (operator === '-') {
        calculation =  operate(subtract, currentTotal, displayValue);
    } else if (operator === '+') {
        calculation = operate(add, currentTotal, displayValue);
    }
    clear = 1;
    printDisplay(calculation, clear);
}

function add(...args) {
    return args.reduce((previous, current) => {
        return previous + current;
    });
}

function subtract(...args) {
    return args.reduce((previous, current) => {
        return previous - current;
    });
}

function multiply(...args) {
    return args.reduce((previous, current) => {
        return previous * current;
    });
}

function divide(...args) {
    return args.reduce((previous, current) => {
        return previous / current;
    });
}

function operate(operator, ...args) {
    return operator(...args);
}