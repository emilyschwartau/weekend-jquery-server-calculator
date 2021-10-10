console.log(`client.js linked!`);
$(document).ready(onReady);

function onReady() {
    console.log("jquery is loaded!");
    getCalculations();
    $(`#equalsButton`).on(`click`, postCalculations);
    $(`#clearButton`).on(`click`, clearInputs);
}//end onReady

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
}//end getCalculations

function postCalculations() {
    $.ajax({
        type: 'POST',
        url: '/calculation',
        data: {
            firstNumber: $(`#firstNumInput`).val(),
            secondNumber: $(`#secondNumInput`).val()
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
    for (let calculation of calculations) {
        $(`#historyContainer`).append(
            `<p>
                ${calculation.firstNumber}
                ${calculation.secondNumber}
            </p>`
        );
    }//end for
}; //end renderToDom

function clearInputs() {
    $(`#firstNumInput`).val(``);
    $(`#secondNumInput`).val(``);
}//end clearInputs
