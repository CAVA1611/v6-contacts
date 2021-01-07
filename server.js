var express = require('express');
var bodyParser = require('body-parser');
var BASE_API_PATH = "/api/v1";

const Contact = require ('./contacts');

var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<html><body><h1>CAVA 1611 - es la quinta version !!</h1></body></html>");
});

app.get(BASE_API_PATH + "/contacts", (req, res) =>{
    console.log(Date() + "- GET /contacts");
    Contact.find({}, (err, contacts) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.send(contacts.map((contact) => {
                return contact.cleanup();
            }));
        }
    });
});

app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + "- POST /contacts");
    var contact = req.body;
    Contact.create(contact, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.send(500);
        } else {
            res.sendStatus(201);
            console.log("Contacto creado")
        }
    });
});

module.exports = app;