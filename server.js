const express = require('express');
const app = express();
const port = 5050;

app.set('views', './views');
app.set('view engine', 'ejs');

// app.[VERB]([PATH], function(req, res) [ // things to do ])


app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.listen(port, () => { console.log(`Express App listening on http://localhost:${port}`)})
