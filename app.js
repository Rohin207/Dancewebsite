const express = require("express")
const path = require("path");
const app = express();
const port = 63078;
app.use(express.urlencoded({ extended: true }))
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const url = "mongodb+srv://test:test@cluster0.qdkejdx.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    Age : String,
    select : String,
    checkbox: String
});

const Contact = mongoose.model('Kitten', contactSchema);
const formdData = (bodyData) => {
    Form({ data: bodyData }).save((err) => {
        if (err) {
            throw err;
        }
    })
}
const urlenecodedParser = bodyParser.urlencoded({ extended: false });



app.post('/', urlenecodedParser, (req, res) => {
    formData(req.body)
    res.render("success", { name: req.body.name })
});


app.set('view', 'ejs')
app.use(express.static('public'))

app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded())


// Get Request 
app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html')
})
app.get('/contact', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/contact.html')
})

app.get('/class-info' , (req,res)=>{
    console.log(__dirname);
    res.sendFile(__dirname + '/class-info.html')
})
app.get('/aboutt' , (req,res)=>{
    console.log(__dirname);
    res.sendFile(__dirname + '/aboutt.html')
})


// DataBase -->
app.post('/form', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Data Submit</title>
        <link rel="stylesheet" href="/static/submit.css">
        </head>
        <body>
            <div class="container">
                <img src="/static/img/Tick.png" alt="" id="img">
                <p class="p">Thanks For Submiting Your Form </p>
                <p class="pk">We'll Try To Connect You As Soon As Possible. Till Then Take Care and Keep Dancing</p>
                <p class="pkkk"> source: RohinDanceAcademy </p>
                <a href="/">Return Home</a>
                </p>
            </div>
        </body>
        </html>`)
    }).catch(() => {
        res.status(400).send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        <link rel="stylesheet" href="/static/submit2.css">
        </head>
        <body>
            <div class="container">
                <img src="/static/img/cross.png" alt="" id="img">
                <p class="p">Unable To Submit Form </p>
                <p class="pk">Please Retry!</p>
                <p class="pkk"> source: RohinDanceAcademy </p>
            </div>
            <div class="btn">
                <a href="/" class="a1">Return Home</a> 
                <a href="/test" class="a2">Retry</a>
            </div>
        </body>
        </html>`)
    })
})

// Port -->
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
