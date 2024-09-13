const calculator = {
    displayValue: '0',   // Value displayed on the screen
    firstOperand: null,  // Keeps first operand for any operation
    waitingForSecondOperand: false,  // Flag to indicate if the calc for 2nd op
    operator: null,  // Keeps the `operator` for the current operation
};

// Function to handle input
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;  // Destructuring to get displayValue and wfso from calculator

    if (waitingForSecondOperand === true) {  // If waiting for the second op
        calculator.displayValue = digit;  // Set displayValue to the digit pressed
        calculator.waitingForSecondOperand = false;  // Reset flag
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;  // Digit to displayValue or replace if it's '0'
    }
}

// Function to handle decimal point input
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {  // If waiting for the second op
        calculator.displayValue = '0.';  // Start new number with '0'
        calculator.waitingForSecondOperand = false;  // Reset flag
        return;
    }

    if (!calculator.displayValue.includes(dot)) {  // If displayValue doesn't already have decimal point
        calculator.displayValue += dot;  
    }
}

// Function for operator input
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;  // Destructuring to get firstOp, displayValue, and op from calc
    const inputValue = parseFloat(displayValue);  // displayValue to floating point number

    if (operator && calculator.waitingForSecondOperand) {  // If op already exists and waiting for the second op
        calculator.operator = nextOperator;  // Update op
        return;
    }

    if (firstOperand == null) {  // If firstOperand is null
        calculator.firstOperand = inputValue;  // Set firstOp to inputValue
    } else if (operator) {  // If op exists
        const result = performCalculation[operator](firstOperand, inputValue);  // Perform calc using the existing op

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;  // Update displayValue with the result rounded to 7 decimal places
        calculator.firstOperand = result;  // Update firstOp with result
    }

    calculator.waitingForSecondOperand = true;  // Set flag to wait for the second op
    calculator.operator = nextOperator;  // Update op
}

// Operation Buttons
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,  // Division
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,  // Multiplication
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,  // Addition
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,  // Subtraction
    '=': (firstOperand, secondOperand) => secondOperand // For '=', just return secondOperand
};

// Function to reset the calc
function resetCalculator() {
    calculator.displayValue = '0';  // Reset displayValue to '0'
    calculator.firstOperand = null;  // Clear firstOp
    calculator.waitingForSecondOperand = false;  // Clear waitingForSecondOp flag
    calculator.operator = null;  // Clear op
}

// Function to update the calculator's display
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');  // Select the calculator screen 
    display.value = calculator.displayValue;  // Set its value to displayValue
}

updateDisplay();  // Update display to show initial value

// Event listener for calculator keys
const keys = document.querySelector('.calculator-keys');  // Select the calc keys
keys.addEventListener('click', (event) => {  // click event listener
    const { target } = event; 
    if (!target.matches('button')) {  // If the clicked button is not a button, do nothing
        return;
    }

    if (target.classList.contains('operator')) {  // If an operator button was clicked
        handleOperator(target.value);  // Handle the operator
        updateDisplay();  // Update the display
        return;
    }

    if (target.classList.contains('decimal')) {  // If a decimal button was clicked
        inputDecimal(target.value);  // Handle the decimal input
        updateDisplay();  // Update the display
        return;
    }

    if (target.classList.contains('all-clear')) {  // If the all-clear button was clicked
        resetCalculator();  // Reset the calculator
        updateDisplay();  // Update the display
        return;
    }

    if (target.classList.contains('equal-sign')) {  // If the equal-sign button was clicked
        handleOperator('=');  // Compute the result
        updateDisplay();  // Update the display
        resetCalculator();  // Reset the calculator
        return;
    }

    inputDigit(target.value);  // Handle digit input
    updateDisplay();  // Update the display
});
