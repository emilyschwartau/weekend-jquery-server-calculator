console.log(`client.js linked!`);
$(document).ready(onReady);

function onReady() {
    console.log("jquery is loaded!");
    getCalculations();
    $(`#equalsButton`).on(`click`, postCalculations);
    $(`#clearButton`).on(`click`, clearInputs);
    $(`#plusButton`).on (`click`, plus);
    $(`#minusButton`).on (`click`, minus);
}//end onReady

function getCalculations() {
    //$(`#plusButton`).on (`click`, req.body.operation = "+");
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then(function (response) {
        console.log('successful response', response);
        renderToDOM(response);
    }).catch(function (response) {
        alert('Im broken!!!!! :(');
    })
}//end getCalculations

function postCalculations() {
    //$(`#plusButton`).on (`click`, calculation.operation = "+");
    $.ajax({
        type: 'POST',
        url: '/calculation',
        data: {
            firstNumber: $(`#firstNumInput`).val(),
            secondNumber: $(`#secondNumInput`).val(),
            // xxxxx
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
}

function renderToDOM(calculations) {
    $(`#historyContainer`).empty();
    //xxxxxxxx
    for (let calculation of calculations) {
        //$(`#plusButton`).on (`click`, calculation.operation = "+");
        $(`#historyContainer`).append(
            `<p>
                ${calculation.firstNumber}
                ${calculation.operation}
                ${calculation.secondNumber}
            </p>`
        );
    }//end for
}; //end renderToDom

function clearInputs() {
    $(`#firstNumInput`).val(``);
    $(`#secondNumInput`).val(``);
}//end clearInputs

let operationsArray = []

function plus() {
    operationsArray = [];
   //$(`#plusButton`).on (`click`, calculation.operation = "+"); 
   operationsArray.push("+");
};

function minus() {
    operationsArray = [];
    operationsArray.push("-");
};
