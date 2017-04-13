const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    fs.appendFile('server.log', `log: ${new Date().toString()} -  request to ${req.url}\n`, (err) => {
        if (err) {
            console.log('Unable to append to server log');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintanance.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page!',
        welcomeMessage: 'Hello World!'
    });
});

app.get('/about', function(req, res) {
    res.render('about.hbs', {
        pageTitle: 'About!'
    });
});

app.listen(3000);
