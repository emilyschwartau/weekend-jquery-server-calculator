console.log(`client.js linked!`);
$(document).ready(onReady);

function onReady() {
    console.log("jquery is loaded!");
    getCalculations();
    $(`#equalsButton`).on(`click`, postCalculations);
    $(`#clearButton`).on(`click`, clearInputs);
    $(`#plusButton`).on (`click`, plus);
    $(`#minusButton`).on (`click`, minus);
    $(`#multiplyButton`).on (`click`, multiply);
    $(`#divideButton`).on (`click`, divide);
}//end onReady

function getCalculations() {
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then(function (response) {
        console.log('successful response', response);
        renderToDOM(response);
        //calculator();
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
}

function renderToDOM(calculations) {
    let answer = undefined; 
    $(`#historyContainer`).empty();
    
    for (let calculation of calculations) {
        if (calculation.operation == "+") {
            answer = Number(calculation.firstNumber) + Number(calculation.secondNumber);
            console.log(answer);
          
           
        }//end if 
        if(calculation.operation == "-") {
            answer = Number(calculation.firstNumber) - Number(calculation.secondNumber);
            console.log(answer);
           
            
        }//end if 
        if(calculation.operation == "x") {
            answer = Number(calculation.firstNumber) * Number(calculation.secondNumber);
            console.log(answer);
        }//end if 
        if(calculation.operation == "/") {
            answer = Number(calculation.firstNumber) / Number(calculation.secondNumber);
            console.log(answer);
        }//end if 
        $(`#historyContainer`).append(
            `<p>
                ${calculation.firstNumber}
                ${calculation.operation}
                ${calculation.secondNumber}
                = ${answer}
            </p>`
        );
        $(`#answer`).empty();
        $(`#answer`).append(` `, answer);
    }//end for
}; //end renderToDom

function clearInputs() {
    $(`#firstNumInput`).val(``);
    $(`#secondNumInput`).val(``);
}//end clearInputs

//series of functions that push operation to array on button click
let operationsArray = []

function plus() {
    operationsArray = [];
   operationsArray.push("+");
};

function minus() {
    operationsArray = [];
    operationsArray.push("-");
};

function multiply() {
    operationsArray = [];
    operationsArray.push("x");
};

function divide() {
    operationsArray = [];
    operationsArray.push("/");
};





