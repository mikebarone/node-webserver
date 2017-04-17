var express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log('Unable to write log file');
        }
    });
    next();
});

//app.use((req, res, next)=>{
//    res.render('maintenance.hbs');
//});

// Public folder for site content
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

// Root page
app.get('/',(req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Page!'
    });
});

// Others routes
app.get('/about',(req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad',(req, res) => {
    res.send({
        code: 'Error',
        body: 'Page not found!'
    });
});

app.get('/projects',(req, res)=>{
    res.render('projects.hbs', {
        pageTitle: 'Projects',
        projectsMessage: 'My portfolio... soon it will updated'
    });
});

// Listen port for webserver
app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});