const btns = document.querySelectorAll('.btn');
const digits = document.querySelectorAll('.digit');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const opposite = document.querySelector('.opposite');
const percent = document.querySelector('.percent');
const backspace = document.querySelector('.backspace');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');
const opers = document.querySelectorAll('.oper');

let operMode = false;
let canChangeOperand = false;
let currentOperation = null;
let equal_number = 0;
let equal_operand;

// things to improve:
// add on keystroke
// figure out the decimal points console.log(Number(5.1) + Number(0.1))
// separate the function from the addEventListener
// add more comments


const operator = (currentOperation, secondNumber) => {
    let operand = currentOperation.slice(-1);
    let number1 = Number(currentOperation.slice(0, -1));
    let number2 = Number(secondNumber);
    // console.log(number1, number2, operand);
    if (operand == "+") return number1 + number2;
    else if (operand == "-") return number1 - number2;
    else if (operand == "x") return number1 * number2;
    else if (operand == "÷") return number1 / number2;
    
}

digits.forEach(digit => digit.addEventListener('click', (e) => {
    if (display.innerHTML == '0') {
        display.innerHTML = e.target.innerHTML;
    } else {
        if (currentOperation != null) {
            if (canChangeOperand) {
                display.innerHTML = e.target.innerHTML;
                canChangeOperand = false;
            } else {
                display.innerHTML += e.target.innerHTML;
            }
        } else {
            display.innerHTML += e.target.innerHTML;
        }
    }
    equal_number = display.innerHTML;
}))

opers.forEach(oper => oper.addEventListener('click', (e) => {
    if (currentOperation == null) {
        currentOperation = display.innerHTML + e.target.innerHTML;
        canChangeOperand = true;
    } 
    else {
        // display.innerHTML = evaluate(currentOperation, e.target.innerHTML);
        if (canChangeOperand) {
            currentOperation = currentOperation.slice(0, -1) + e.target.innerHTML;
        } else {
            display.innerHTML = operator(currentOperation, display.innerHTML);
            currentOperation = display.innerHTML + e.target.innerHTML;
            canChangeOperand = true;
        }
    }
    equal_number = display.innerHTML;
}))

equal.addEventListener('click', () => {
    if (currentOperation != null) {
        let equal_operand = currentOperation.slice(-1);
        display.innerHTML = operator(currentOperation, equal_number);
        currentOperation = display.innerHTML + equal_operand;
        canChangeOperand = true;
    }
})

clear.addEventListener('click', () => {
    currentOperation = null;
    canChangeOperand = false;
    display.innerHTML = 0;
    equal_number = 0;
    equal_operand = null;
})

opposite.addEventListener('click', () => {
    if (Number(display.innerHTML) != 0) {
        display.innerHTML = Number(display.innerHTML) * (-1);
    }
    equal_number = display.innerHTML;
    canChangeOperand = false;
})

percent.addEventListener('click', () => {
    display.innerHTML = Number(display.innerHTML) / (100);
    equal_number = display.innerHTML;
    canChangeOperand = false;
})

decimal.addEventListener('click', () => {
    if (display.textContent == '' || display.textContent == '-') {
        display.textContent = 0;
    }
    if (canChangeOperand) {
        display.textContent = '0.';
        canChangeOperand = false;
    } else {
        if (display.textContent.includes('.')) return;
        display.textContent += '.';
    }
})

backspace.addEventListener('click', () => {
    if (display.innerHTML.length > 1) {
        display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1);
    } else {
        display.innerHTML = 0;
    }
    equal_number = display.innerHTML;
    canChangeOperand = false;
})

// btns.forEach(btn => btn.addEventListener('click', recording));

btns.forEach(btn => btn.addEventListener('mousedown', () => {
    btn.style.setProperty('box-shadow', '0px 0px 5px 2px white');
}))

btns.forEach(btn => btn.addEventListener('mouseup', () => {
    btn.style.setProperty('box-shadow', 'none');
}))