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
const audio = new Audio("tink.wav");

let canChangeOperand = false;
let currentOperation = null;
let equal_number = 0;
let equal_operand;
let key_value;
const shortcuts = {
    "Enter": "=",
    "Escape": "AC",
    "Backspace": "Del",
    "Delete": "Del",
    "*": "x",
    "/": "÷",
}

const operator = (currentOperation, secondNumber) => {
    let operand = currentOperation.slice(-1);
    let number1 = parseFloat(parseFloat(currentOperation.slice(0, -1)).toFixed(10));
    let number2 = parseFloat(parseFloat(secondNumber).toFixed(10));
    if (operand == "+") return RoundNumber(number1 + number2);
    else if (operand == "-") return RoundNumber(number1 - number2);
    else if (operand == "x") return RoundNumber(number1 * number2);
    else if (operand == "÷") return RoundNumber(number1 / number2);
}

// figure out the decimal points console.log(Number(5.1) + Number(0.1))
const RoundNumber = (num) => {
    return Math.round(num * 1000000000) / 1000000000;
}

const addDigit = (e) => {
    if (display.innerHTML == '0') {
        display.innerHTML = e;
    } else {
        if (currentOperation != null) {
            if (canChangeOperand) {
                display.innerHTML = e;
                canChangeOperand = false;
            } else {
                display.innerHTML += e;
            }
        } else {
            display.innerHTML += e;
        }
    }
    equal_number = display.innerHTML;
}

const addOper = (e) => {
    if (currentOperation == null) {
        currentOperation = display.innerHTML + e;
        canChangeOperand = true;
    } 
    else {
        if (canChangeOperand) {
            currentOperation = currentOperation.slice(0, -1) + e;
        } else {
            display.innerHTML = operator(currentOperation, display.innerHTML);
            currentOperation = display.innerHTML + e;
            canChangeOperand = true;
        }
    }
    equal_number = display.innerHTML;
}

const equalFunc = () => {
    if (currentOperation != null) {
        let equal_operand = currentOperation.slice(-1);
        display.innerHTML = operator(currentOperation, equal_number);
        currentOperation = display.innerHTML + equal_operand;
        canChangeOperand = true;
    }
}

const clearFunc = () => {
    currentOperation = null;
    canChangeOperand = false;
    display.innerHTML = 0;
    equal_number = 0;
    equal_operand = null;
}

const oppositeFunc = () => {
    if (Number(display.innerHTML) != 0) {
        display.innerHTML = Number(display.innerHTML) * (-1);
    }
    equal_number = display.innerHTML;
    canChangeOperand = false;
}

const percentFunc = () => {
    display.innerHTML = Number(display.innerHTML) / (100);
    equal_number = display.innerHTML;
    canChangeOperand = false;
}

const decimalFunc = () => {
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
}

const backspaceFunc = () => {
    if (display.innerHTML.length > 1) {
        display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1);
    } else {
        display.innerHTML = 0;
    }
    equal_number = display.innerHTML;
    canChangeOperand = false;
}


digits.forEach(digit => digit.addEventListener('click', e => addDigit(e.target.innerHTML)));

opers.forEach(oper => oper.addEventListener('click', e => addOper(e.target.innerHTML)));

equal.addEventListener('click', equalFunc);

clear.addEventListener('click', clearFunc);

opposite.addEventListener('click', oppositeFunc);

percent.addEventListener('click', percentFunc);

decimal.addEventListener('click', decimalFunc);

backspace.addEventListener('click', backspaceFunc);

btns.forEach(btn => btn.addEventListener('mousedown', () => {
    btn.classList.add("highlight");
    audio.currentTime = 0;
    audio.play();
}))

btns.forEach(btn => btn.addEventListener('mouseup', () => {
    btn.classList.remove("highlight");
}))

addEventListener("keydown", e => {
    if (e.key != " ") {
        key_value = (shortcuts[e.key] ? shortcuts[e.key] : e.key);
    } else {
        key_value = "";
    }

    if (key_value >= 0 && key_value<=9) {
        if (key_value == "5" && e.ctrlKey) {
            percentFunc();
            key_value = "%";
        } else {
            addDigit(key_value);
        }
        audio.currentTime = 0;
        audio.play();
    }

    if (key_value == "+" || key_value == "-" || key_value == "x" || key_value == "÷") {
        if (key_value == "-" && e.shiftKey) {
            oppositeFunc();
            key_value = "+/-";
        } else {
            addOper(key_value);
        }
        audio.currentTime = 0;
        audio.play();
    }

    if (key_value == "=") equalFunc();
    if (key_value == "AC") clearFunc();
    if (key_value == ".") decimalFunc();
    if (key_value == "Del") backspaceFunc();

    if (key_value == "=" || key_value == "AC" || key_value == "." || key_value == "Del") {
        audio.currentTime = 0;
        audio.play();
    }

    btns.forEach(btn => {
        if (btn.innerHTML == key_value) btn.classList.add('highlight');
    })

})

addEventListener("keyup", e => {
    key_value = (shortcuts[e.key] ? shortcuts[e.key] : e.key);

    if (e.key == "5" && e.ctrlKey) key_value = "%";
    
    if (e.key == "-" && e.shiftKey) key_value = "+/-";

    btns.forEach(btn => {
        if (btn.innerHTML == key_value) btn.classList.remove('highlight');
    })

    key_value = null;
})