let express = require(`express`);
const bodyParser = require('body-parser')

//make a server
let app = express();
const PORT = 5000;

//hooking up static file server
app.use(express.static(`server/public`));

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }))

let calculations = []; 

app.get('/calculation', (req, res) => {
    console.log (`got to /calculation GET`)
    res.send(calculations);
})

app.post('/calculation', (req, res) => {
    let calculation = req.body;
    //$(`#plusButton`).on (`click`, calculation.operation = "+");
    calculations.push(calculation);
    console.log('pushed into calculations array', calculation);
    res.sendStatus(201);
})






//listen for incoming connections on PORT
app.listen(PORT, () => {
    console.log(`app running on PORT`, PORT)
})






