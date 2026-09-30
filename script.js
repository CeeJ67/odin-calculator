const display = document.querySelector("#display");
 
let firstNumber = null;
let operator = null;
let secondNumber = null;

let shouldResetDisplay = false;

function addition(a,b){     //functions that does the operations
    return a + b;
}

function multiply(a,b){
    return a * b;
}

function subtract(a,b){
    return a - b;
}

function divide(a,b){
    return a/b;
}

function operation(op,a,b){     //call the functions that does the calculations
    a = Number(a);
    b = Number(b);

    if(op === "add"){
        return addition(a,b);
    }

    if(op === "subtract"){
        return subtract(a,b);
    }

    if(op === "multiply"){
        return multiply(a,b);
    }

    if(op === "divide"){
        if(b === 0){
            return "Error.";
        }

        return divide(a,b);
    }
}

function calculate(){       //runs the operations and shows the result
    secondNumber = display.textContent;
    let result = operation(operator, firstNumber, secondNumber);
    display.textContent = Number(result.toFixed(2));
    firstNumber = display.textContent;
}
 
function pressDigit(digit){     //shows the digits being pressed
    display.textContent = (display.textContent === "0" || shouldResetDisplay)
        ? digit
        : display.textContent + digit;
    shouldResetDisplay = false;
}
 
function pressOperator(action){     //it locks in the first number then runs to get the desired operation
    if(firstNumber === null){
        firstNumber = display.textContent;
    } else if(!shouldResetDisplay){
        calculate();
    }
    operator = action;
    shouldResetDisplay = true;
}
 
function pressEquals(){     //it calculates the equation
    if(firstNumber !== null && !shouldResetDisplay){        //makes sure that the first input is not empty
        calculate();
        shouldResetDisplay = true;
    }
}
 
function clearAll(){            //clears everything from the calculation
    firstNumber = null;
    operator = null;
    shouldResetDisplay = false;
    display.textContent = "0";
}
 
document.querySelectorAll(".digit").forEach(btn =>                              //connects the functions to the respective buttons
    btn.addEventListener("click", () => pressDigit(btn.dataset.digit))
);
 
document.querySelectorAll(".operator").forEach(btn =>
    btn.addEventListener("click", () => pressOperator(btn.dataset.action))
);
 
document.querySelector(".equals").addEventListener("click", pressEquals);
document.querySelector(".clear").addEventListener("click", clearAll);