const express = require('express');
const app = express();
const port = 5050;

app.set('views', './views');
app.set('view engine', 'ejs');

// app.[VERB]([PATH], function(req, res) [ // things to do ])

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.get('/signup', (req, res) => {
  res.render('users/new')
})

app.get('/users', (req, res) => {
  res.render('users/index')
})

app.post('/signup', (req, res) => {
  res.redirect('users/index') // redirect takes the path not the file path
})

app.get('/new-cohort', (req, res) => {
  res.render('cohorts/new')
})

app.get('/new-course', (req, res) => {
  res.render('courses/new')
})

app.listen(port, () => { console.log(`Express App listening on http://localhost:${port}`)})
