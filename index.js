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

let number1 = 0;
let number2 = 0;
let number2Typed = 0;
let operand;
let goodForCalculation = 0;
let operMode = false;
let currentNumber = null;
let currentOperation = null;

// const recording = (input) => {
//     if (input.target.classList.contains('digit')) {
//         if (operMode == false){
//             if (number1 == 0) {
//                 number1 = input.target.textContent;
//             } else {
//                 number1 = number1 + input.target.textContent;
//             }
//             display.innerHTML = number1;
//         } else {
//             if (number2 == 0) {
//                 number2 = input.target.textContent;
//             } else {
//                 number2 = number2 + input.target.textContent;
//             }
//             goodForCalculation = 1;
//             display.innerHTML = number2;
//         }
//     } else if (input.target.classList.contains('oper')) {

//         if (operMode == false || goodForCalculation == 0) {
//             operMode = true;
//             operand = input.target.textContent;
//             number1 = parseFloat(number1);
//             goodForCalculation = 0;

//         } else if (operMode == true && goodForCalculation == 1) {
//             number2 = parseFloat(number2);
//             number1 = operator(number1, number2, operand);
//             operand = input.target.textContent;
//             number2 = 0;
//             goodForCalculation = 0;
//             display.innerHTML = number1;
//         }    
//     }
//     // console.log(number1, number2, operand);
// }

const operator = (number1, number2, operand) => {
    if (operand == "+") return number1 + number2;
    else if (operand == "-") return number1 - number2;
    else if (operand == "x") return number1 * number2;
    else if (operand == "÷") return number1 / number2;
}

digits.forEach(digit => digit.addEventListener('click', (e) => {
    if (display.innerHTML == 0 || currentOperation != null) {
        display.innerHTML = e.target.innerHTML;
        currentOperation = null;
    } else {
        display.innerHTML += e.target.innerHTML;
    }
}))

opers.forEach(oper => oper.addEventListener('click', (e) => {
    if (currentOperation == null) {
        currentOperation = display.innerHTML + e.target.innerHTML;
    } else {
        // display.innerHTML = evaluate(currentOperation, e.target.innerHTML);
        console.log(currentOperation);
        currentOperation = null;
    }
}))

clear.addEventListener('click', () => {
    number1 = 0;
    number2 = 0;
    number2Typed = 0;
    operand = undefined;
    goodForCalculation = 0;
    operMode = false;
    display.innerHTML = 0;
})

opposite.addEventListener('click', () => {
    if (Number(display.innerHTML) != 0) {
        display.innerHTML = Number(display.innerHTML) * (-1);
        currentNumber = Number(display.innerHTML);
    }
})

decimal.addEventListener('click', () => {
    if (display.textContent == '') {
        display.textContent = 0;
    }
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
})

backspace.addEventListener('click', () => {
    if (display.innerHTML != '') {
        display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1);
    }
})

// btns.forEach(btn => btn.addEventListener('click', recording));

btns.forEach(btn => btn.addEventListener('mousedown', () => {
    btn.style.setProperty('box-shadow', '0px 0px 5px 2px white');
}))

btns.forEach(btn => btn.addEventListener('mouseup', () => {
    btn.style.setProperty('box-shadow', 'none');
}))