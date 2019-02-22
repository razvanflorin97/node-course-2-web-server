const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


app.get(`/`, (request, response) => {
  //response.send('<h1>Hello<h1>');
  response.render('home.hbs', {
    welcome: 'Welcome',
    title: 'RZZ'
  })
});

app.get('/about', (request, response) => {
  //response.send('About Page');
  response.render('about.hbs', {
    title: 'RZZ'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad, bad, bad'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});