/*
plan:
- select numbers to preform operations, 2 nums
- add , subtract, multiply, divide. the equal should display the answer
- only between 2 numbers
- see the output of the operation
- clear all operations if clicked c and begin from 0

- try foreach and then maybe event delegation ---> keeping foreach bec I believe event delegation will have approximatly the same code only the first few lines are different
*/

function init() {
    const buttons = document.querySelectorAll('.button');
    const displayElm = document.querySelector('.display');

    let firstNum = '';
    let secondNum = '';
    let operator;
    const operation = ['+', '-', '*', '/'];
    let answerDisplay = false;

    displayElm.textContent = '0';

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            let input = event.target.innerText;
            if (input === 'C') {
                displayElm.textContent = '0';
                firstNum = '';
                secondNum = '';
                operator = '';
                answerDisplay = false;
            }
            else if (input === '=') {
                if (firstNum && secondNum && operator) {
                    let num1 = parseFloat(firstNum);
                    let num2 = parseFloat(secondNum);
                    let result;
                    switch (operator) {
                        case '+':
                            result = num1 + num2;
                            break;
                        case '-':
                            result = num1 - num2;
                            break;
                        case '*':
                            result = num1 * num2;
                            break;
                        // note to self: dividing by 0 gives infinity answer so instead I added a condition to display error messege instead of infinity
                        case '/':
                            result = num2 !== 0 ? num1 / num2 : 'Error';
                            break;
                    }
                    displayElm.textContent = result;
                    firstNum = '';
                    operator = '';
                    secondNum = '';
                    answerDisplay = true;
                }
            }
            else if (!isNaN(input)) {
                if (answerDisplay) {
                    // starting a new calculation 
                    displayElm.textContent = input;
                    firstNum = input;
                    operator = '';
                    secondNum = '';
                    answerDisplay = false;
                } else if (!operator) {
                    // first number
                    if (displayElm.textContent === '0') {
                        displayElm.textContent = input;
                        firstNum = input;
                    } else {
                        firstNum += input;
                        displayElm.textContent += input;
                    }
                } else if (operator && !answerDisplay) {
                    //second number
                    secondNum += input;
                    displayElm.textContent += input;
                }
            }
            else if (operation.includes(input)) {
                if (firstNum && !operator) {
                    // operator
                    operator = input;
                    displayElm.textContent += input;
                }
            }
        });
    });


}
document.addEventListener('DOMContentLoaded', init)