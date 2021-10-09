let express = require(`express`);
const bodyParser = require('body-parser')

//make a server
let app = express();
const PORT = 5000;

//hooking up static file server
app.use(express.static(`server/public`));

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }))






//listen for incoming connections on PORT
app.listen(PORT, () => {
    console.log(`app running on PORT`, PORT)
})






