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

const screenDisplay = document.getElementById('screen').querySelector('p');
let displayValues;
let operationPairs = [];


buttons = document.querySelectorAll('.button');
buttons.forEach(node => node.addEventListener('click', input));

function input(e) {
    let buttonValue = e.currentTarget.getAttribute('data-value');
    let buttonClass = e.currentTarget.getAttribute('class');
    if (buttonClass === 'button function' || buttonClass === 'button operator') {
        runFunction(buttonValue, buttonClass);
    } else {
        printDisplay(buttonValue);
    }
}

function printDisplay (buttonValue) {
    screenDisplay.innerHTML += buttonValue;
    displayValues = screenDisplay.innerHTML;
}

function runFunction(buttonValue, buttonClass) {
    if (buttonValue === 'equals') {
        calculateDisplayValues();
    } else if (buttonClass === 'button operator') {
        let currentExpression = createDisplayArray();
        if (currentExpression.length === 1) {
            printDisplay(buttonValue);
        } else {
            let splitExpression = currentExpression[1].split('');
            if (splitExpression.length > 1) {
                calculateDisplayValues();
                printDisplay(buttonValue);
            } else {
                replaceOperator(buttonValue);
            }
        }
    }
}

function createDisplayArray() {
    return displayValues.split(/(?=[-+÷\×])/);
}

function replaceOperator(buttonValue) {
    let currentExpression = createDisplayArray();
    currentExpression.splice(1, 1, buttonValue);
    newOperatorExpression = currentExpression.join('');
    screenDisplay.innerHTML = newOperatorExpression;
}

function calculateDisplayValues() {
    console.log('runnign');
    let valuesArray = displayValues.split(' ');
    let firstValue = Number(valuesArray[0]);
    valuesArray.splice(0, 1);
    operationPairs = valuesArray.reduce((array, currentItem, i) => {
        if (isNaN(Number(currentItem))) {
            array.push(valuesArray.slice(i, i + 2));
        }
        return array;
    }, []);
    let calculation = operationPairs.reduce((total, currentItem) => {
        if (total === 0) {
            total = firstValue;
        }
        let nextValue = Number(currentItem[1]);
        
        if (currentItem[0] === '÷') {
            return total = operate(divide, total, nextValue);
        } else if (currentItem[0] === '×') {
            return total = operate(multiply, total, nextValue);
        } else if (currentItem[0] === '-') {
            return total = operate(subtract, total, nextValue);
        } else if (currentItem[0] === '+') {
            return total = operate(add, total, nextValue);
        }
    }, 0);
    screenDisplay.innerHTML = calculation;
}