const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('#ac');
const clearButton = document.querySelector('#del');
const equalButton = document.querySelector('#eql');
const currentOutput = document.querySelector('#current');
const prevOutput = document.querySelector('#previous');

let operator;
let currentOperand = "";
let prevOperand = "";


// functions 

function allClear(){
   currentOperand = "";
   prevOperand = "";
   operator = undefined;
   update();
}

function clear(){
    currentOutput.textContent = currentOutput.textContent.slice(0,-1);
}

function compute(){
    let result;
    const prev = parseFloat(prevOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) && isNaN(current)) return;
    switch(operator){
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default: 
            return;
    }   
    currentOperand = result;
    operator = undefined;
    prevOperand = '';
       
}

function append(number){
    if(number === '.' && currentOperand.includes('.')) return;
    else currentOperand = currentOperand.toString() + number.toString();
}

function operation(operation) {
    if(currentOperand == '') return;
    if(prevOperand != ''){
        compute();
    }
    operator = operation;
    prevOperand = currentOperand;
    currentOperand = '';
}

function update(){
    currentOutput.textContent = currentOperand;
    if(operator != null){
        prevOutput.textContent = `${prevOperand} ${operator}`;
    }
    else prevOutput.textContent = prevOperand;
    
}

//EventListeners
numberButtons.forEach(button => {
    button.addEventListener('click',() =>{
        append(button.value);
        console.log(button.value);
        update();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click',() =>{
        operation(button.value);
        console.log(button.value);
        update();
    })
})
allClearButton.addEventListener('click',allClear);
clearButton.addEventListener('click',clear);
equalButton.addEventListener('click',button => {
    compute();
    update();
})

allClear();