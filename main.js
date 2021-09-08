let display = document.querySelector('#display-content');
let buttons = [...document.querySelectorAll('button')];
let currentOperation = [];
let operator = '';
let firstNum = '';
let lastNum = '';

buttons.forEach(button => button.addEventListener('click', populateDisplay));

function populateDisplay(e){
    switch(e.target.textContent){
            case 'AC': return clearDisplay();
            case 'DEL': return del();
            case '=': return equals();
    };
    
    if (currentOperation.includes(operatorCheck()) && e.target.classList.contains('operator')){
        equals();
        currentOperation.push(e.target.textContent);
        return display.textContent += e.target.textContent;
    };

    if (e.target.classList.contains('operator') && e.target.textContent != '='){
        currentOperation.push(e.target.textContent);
        return display.textContent += ` ${e.target.textContent} `;
    };

    if (e.target.classList.contains('digit')){

        if(display.textContent == '' && e.target.textContent == '.'){
            currentOperation.push('0.'); 
            return display.textContent += '0.';
        }
        else if(e.target.textContent == '.' && currentOperation.includes('.')){
            return display.textContent;
        }
        else {
            currentOperation.push(e.target.textContent);
            return display.textContent += e.target.textContent;
        };
    };
};

function operatorCheck(){
    if(currentOperation.includes('+')) return '+'; 
    else if(currentOperation.includes('-')) return '-';
    else if(currentOperation.includes('x')) return 'x';
    else if(currentOperation.includes('÷')) return '÷';
};

function equals(){
    operator = operatorCheck();
    firstNum = currentOperation.slice(0, currentOperation.indexOf(operator)).join('');
    lastNum = currentOperation.slice(currentOperation.indexOf(operator) + 1, currentOperation.length).join('');

    if(operator == '÷' && lastNum == '0'){ 
            alert('You cant\'t divide by 0 :('); 
            currentOperation = [];
            return display.textContent = '';
    };
    if(
        operator == undefined || 
        firstNum == '' || 
        lastNum == ''
        ) return display.textContent;
    
    (operate(operator).toString().length > operate(operator).toFixed(3).length) 
        ? display.textContent = parseFloat(operate(operator).toFixed(3)) 
        : display.textContent = operate(operator);

    if(display.textContent == 'NaN'){
        currentOperation = [];
        return display.textContent = '';
    }
    
    console.log(currentOperation);
    currentOperation = display.textContent.split('');    
}

function operate(operator){
    switch(operator){
        case '+': return add(firstNum, lastNum);
        case '-': return subtract(firstNum, lastNum);
        case 'x': return multiply(firstNum, lastNum);
        case '÷': return divide(firstNum, lastNum);
    };
};

function add(a, b){
    return parseFloat(a) + parseFloat(b);
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
};

function clearDisplay(){
    display.textContent = '';
    currentOperation = [];
}

function del(){
    currentOperation.pop();
    display.textContent = currentOperation.join('');
}