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
    if (buttonClass === 'button function') {
        runFunction(buttonValue);
    } else {
        printDisplay(buttonValue, buttonClass);
    }
}

function printDisplay (buttonValue, buttonClass) {
    if (buttonValue === '.') {
        screenDisplay.innerHTML += buttonValue;
    } else if (buttonClass === 'button operator') {
        screenDisplay.innerHTML += ` ${buttonValue} `;
    } else {
        screenDisplay.innerHTML += buttonValue;
    }
    displayValues = screenDisplay.innerHTML;
}

function runFunction(type) {
    if (type === 'equals') {
        convertDisplayValues();
    }
}

function convertDisplayValues() {
    let valuesArray = displayValues.split(' ');
    let firstValue = valuesArray[0];
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
        let currentValue = total;
        
        if (currentItem[0] === '&#247') {
            return total = operate(divide, total, nextValue);
        } else if (currentItem[0] === 'x') {
            return total = operate(multiply, total, nextValue);
        } else if (currentItem[0] === '-') {
            return total = operate(subtract, total, nextValue);
        } else if (currentItem[0] === '+') {
            return total = operate(add, total, nextValue);
        }
    }, 0);
    console.log(calculation);
}

function currentOperator(item) {
    switch(currentItem[0]) {
        case '&#247':
            console.log('yea');
            return operate(divide, firstValue, nextValue)
        case 'x':
            console.log('yeah');
            operate(multiply, firstValue, nextValue)
            break;
        case '-':
            operate(subtract, firstValue, nextValue)
            break;
        case '+':
            operate(add, firstValue, nextValue)
            break;
    }
}