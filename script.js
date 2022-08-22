
const display = document.querySelector('#display');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const percent = document.querySelector('.percent');
const equal = document.querySelector('.equal');
const sign = document.querySelector('.sign');
const clear = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
let result = '';
let currentOperator = null;
let resetOperation = false;
let currentNumber = '';
let previousNumber = '';


function resetNumber() {
    currentNumber = '';
}

function assignNumber(e) {
    if (resetOperation === true) {
        resetNumber();
        resetOperation = false;
    }
    currentNumber += e.target.value;
    display.textContent = currentNumber; 
    if (currentNumber.length > 12) {
        display.textContent = currentNumber.substring(0,12);
        currentNumber = display.textContent;
    }
}


function assignOperator(e) {
    if (currentOperator !== null && currentNumber === '') {
        currentOperator = e.target.value;
        return;
    }
    if (currentOperator !== null)  evaluate();
    if (currentNumber === '') currentNumber = 0;
    previousNumber = parseFloat(currentNumber);
    resetNumber();
    currentOperator = e.target.value;
}

function operate() {
    let a = previousNumber;
    let b = parseFloat(currentNumber);
    if (currentOperator === '+') return add(a, b);
    if (currentOperator === '-') return subtract(a, b);
    if (currentOperator === '*') return multiply(a, b); 
    if (currentOperator === '/') {
        if (b === 0) {
            alert(`You can't divide by 0.`);
            return null;
        } else {
            return divide(a, b);
        }
    }
} 
    
function evaluate() {
    if (currentOperator !== null && resetOperation === true) return;
    if (currentOperator !== null && resetOperation === false) {
       // display.textContent = roundResult(operate());

        result = roundResult(operate());

        // avoid display overflowing
        if (result.toString().length > 12) {
            result = result.toExponential(6);
        }

        display.textContent = result;
    
        currentNumber = display.textContent;
        resetOperation = true;
        currentOperator = null;
    };
}


function addDecimal() {
        if (display.textContent.includes('.')) return;
        //reset number if press =
        if (resetOperation === true) {
            currentNumber = 0; 
            resetOperation = false;
        };
        currentNumber += '.';
        display.textContent = currentNumber;
}

function resetAll() {
    currentOperator = null;
    currentNumber = '';
    previousNumber = '';
    display.textContent = 0;
}

function invertSign() {
    display.textContent = currentNumber * (-1);
    currentNumber = display.textContent;
}

function percentage() {
    display.textContent = currentNumber / 100;
    currentNumber = display.textContent;
}


numbers.forEach((button) => 
    button.addEventListener('click', assignNumber));

operators.forEach((button) => 
    button.addEventListener('click', assignOperator));

equal.addEventListener('click', evaluate);

clear.addEventListener('click', resetAll)

sign.addEventListener('click', invertSign)

percent.addEventListener('click', percentage)

decimal.addEventListener('click', addDecimal)


// basic math function
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a,b) => a * b;

const divide = (a,b) =>  a / b;


function roundResult(num) {
    return Math.round(num * 100000) / 100000;
};


window.addEventListener('keydown', handleKey);

function handleKey (e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
    key.classList.add(':active');
};


