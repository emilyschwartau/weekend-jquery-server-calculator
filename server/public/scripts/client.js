console.log(`client.js linked!`);
$(document).ready(onReady);

function onReady() {
    console.log("jquery is loaded!");
    getCalculations();
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

function renderToDOM(calculations) {
    for (let calculation of calculations) {
        $(`#historyContainer`).append(
            `<p>
                ${calculation}
            </p>`
        );
    }//end for
}; //end renderToDom
