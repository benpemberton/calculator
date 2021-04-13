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
buttons.forEach(node => node.addEventListener('click', input));

function input(e) {
    let buttonValue = e.currentTarget.getAttribute('data-value');
    let buttonClass = e.currentTarget.getAttribute('class');
    if (buttonClass === 'button function') {
        numberPressed = false;
        runFunction(buttonValue, buttonClass);
    } else if (buttonClass === 'button operator' && displayValue !== '')  {
        operatorPressed = true;  
        runOperator(buttonValue);
        numberPressed = false;
    } else if (buttonClass === 'button number') {
        if (operatorPressed === true) {
            operatorPressed = false;
            screenDisplay.innerHTML = '';   
        }
        numberPressed = true;
        printDisplay(buttonValue);
    }
}

function printDisplay(value, clear) {
    if (clear) {
        screenDisplay.innerHTML = value;
        clear = 0;
    } else {
        screenDisplay.innerHTML += value;
        displayValue = screenDisplay.innerHTML;
    }
}

function printCurrent(buttonValue) {
    currentOperation.innerHTML = displayValue + ' ' + buttonValue;
}

function runOperator(buttonValue) {      
    if (operator === undefined || numberPressed === false) { 
        printCurrent(buttonValue);
        operator = buttonValue;
    } else if (numberPressed === true) {
        currentTotal = currentOperation.innerHTML.split(' ')[0];
        calculateDisplayValue();
        operator = buttonValue;
        currentOperation.innerHTML = screenDisplay.innerHTML + ' ' + operator;
    }
}

function runFunction(buttonValue, buttonClass) {
    if (buttonValue === 'equals') {
        currentTotal = currentOperation.innerHTML.split(' ')[0];
        calculateDisplayValue();
        currentOperation.innerHTML = screenDisplay.innerHTML + ' ' + operator;
    }
}

function createExpArray(expression) {
    return String(expression).split(/(?=[-+÷\×])/);
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