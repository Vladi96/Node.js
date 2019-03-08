let express = require('express');
let hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => new Date().getFullYear())

let app = express();

app.set('view engine', hbs);

app.get('/', (req, res) => {
    res.render('home.hbs', {
        name: 'Vladimir',
        lastName: 'Ignatov',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About my server!'
    });
});

app.listen('3000');