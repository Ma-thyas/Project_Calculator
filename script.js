const display = document.querySelector('#display');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const percent = document.querySelector('.percent');
const equal = document.querySelector('.equal');
const sign = document.querySelector('.sign');
const clear = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
let operator;
let currentOperator = null;
let resetOperation = false;
let currentNumber = '';
let previousNumber = '';


function resetNumber() {
    currentNumber = '';
}

function assignNumber(e) {
    if (resetOperation === true) resetNumber();
    resetOperation = false;
    currentNumber += e.target.value;
    display.textContent = currentNumber;  
    console.log(`currentNumber is ${currentNumber}`);
    console.log(`previousNumber is ${previousNumber}`);
}

function assignOperator(e) {
    if (currentOperator !== null)  evaluate();
    previousNumber = parseInt(currentNumber);
    resetNumber();
    operator = e.target.value;
    currentOperator = operator;
    console.log(currentOperator);
    //change color when clicked
}

function operate() {
    let a = previousNumber;
    let b = parseInt(currentNumber);
    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
} 
    
function evaluate() {
    if (currentOperator !== null && resetOperation === true) return;
    if (currentOperator !== null && resetOperation === false) operate();
    display.textContent = roundResult(operate());
    currentNumber = display.textContent;
    resetOperation = true;
    console.log(`currentNumber is ${currentNumber}`);
    console.log(`previousNumber is ${previousNumber}`);
    console.log (resetOperation)t;
}

function resetAll(e) {
    currentOperator = null;
    currentNumber = '';
    previousNumber = '';
    display.textContent = 0;
}

numbers.forEach((button) => 
    button.addEventListener('click', assignNumber));

operators.forEach((button) => 
    button.addEventListener('click', assignOperator));

equal.addEventListener('click', evaluate);

clear.addEventListener('click', resetAll)

// basic math function
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a,b) => a * b;

const divide = (a,b) =>  a / b;


function roundResult(num) {
    return Math.round(num * 100000) / 100000;
}


//function operate(a, b) {
//    if (operator === '+') return add(a, b);
//    if (operator === '-') return subtract(a, b);
 //   if (operator === '*') return multiply(a, b);
//    if (operator === '/') return divide(a, b);
//}

