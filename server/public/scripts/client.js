console.log(`client.js linked!`);
$(document).ready(onReady);

function onReady() {
    console.log("jquery is loaded!");
    getOperations();
    getCalculations();
    $(`#equalsButton`).on(`click`, postCalculations);
    $(`#clearButton`).on(`click`, clearInputs);
} //end onReady

function getCalculations() {
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then(function (response) {
        console.log('successful response', response);
        renderToDOM(response);
    }).catch(function (response) {
        alert('Im broken!!!!! :(');
    })
} //end getCalculations

function postCalculations() {
    $.ajax({
        type: 'POST',
        url: '/calculation',
        data: {
            firstNumber: $(`#firstNumInput`).val(),
            secondNumber: $(`#secondNumInput`).val(),
            operation: operationsArray
        }
    }).then(function (response) {
        console.log('Great Success!!!');
        getCalculations();
        $('#firstNumInput').val(``);
        $('#secondNumInput').val(``);
    }).catch(function (response) {
        alert('You Broke It!!!', response)
    })
} //end postCalculations

function renderToDOM(calculations) {
    let answer = undefined;
    $(`#historyContainer`).empty();

    for (let calculation of calculations) {
        if (calculation.operation == "+") {
            answer = Number(calculation.firstNumber) + Number(calculation.secondNumber);
            console.log(answer);
        } //end if 
        if (calculation.operation == "-") {
            answer = Number(calculation.firstNumber) - Number(calculation.secondNumber);
            console.log(answer);
        } //end if 
        if (calculation.operation == "x") {
            answer = Number(calculation.firstNumber) * Number(calculation.secondNumber);
            console.log(answer);
        } //end if 
        if (calculation.operation == "/") {
            answer = Number(calculation.firstNumber) / Number(calculation.secondNumber);
            console.log(answer);
        } //end if 
        $(`#historyContainer`).append(
            `<ul>
            <li>
                ${calculation.firstNumber}
                ${calculation.operation}
                ${calculation.secondNumber}
                = ${answer}
            </li>
            </ul>`
        );
        $(`#answer`).empty();
        $(`#answer`).append(` `, answer);
    } //end for
}; //end renderToDom

function clearInputs() {
    $(`#firstNumInput`).val(``);
    $(`#secondNumInput`).val(``);
} //end clearInputs



///////////////////////////////////////////////////////
//getting operation array from server & modifying 
//don't need to post if clearing array in each function on click?
//just working out of array on current basis so don't need to post to server?

function getOperations() {
    $.ajax({
        type: 'GET',
        url: '/operation'
    }).then(function (response) {
        console.log('successful response', response);
        calculator(response);
    }).catch(function (response) {
        alert('Im broken!!!!! :(');
    })
} //end getOperations

function calculator() {
    $(`#plusButton`).on(`click`, plus);
    $(`#minusButton`).on(`click`, minus);
    $(`#multiplyButton`).on(`click`, multiply);
    $(`#divideButton`).on(`click`, divide);

    function plus() {
        operationsArray = [];
        operationsArray.push("+");
    } //end plus

    function minus() {
        operationsArray = [];
        operationsArray.push("-");
    } //end minus

    function multiply() {
        operationsArray = [];
        operationsArray.push("x");
    } //end multiply

    function divide() {
        operationsArray = [];
        operationsArray.push("/");
    } //end divide
} //end calculator