const express = require('express');
const app = express();
app.use(express.urlencoded( {extended: true} ));
const port = 5050;

app.set('views', './views');
app.set('view engine', 'ejs');

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'development.sqlite3',
});

// app.[VERB]([PATH], function(req, res) [ // things to do ])

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/signup', (req, res) => {
  res.render('users/new')
})

app.post('/users', (req, res) => {
 let params = req.body
  User.sync({force: true}).then(() => {
    // Table created
    return User.create({
      name: params.name,
      password: params.password,
      email: params.email,
      education: params.education
    });
  });
  res.redirect('users') // redirect takes the path not the file path
})

app.get('/new-cohort', (req, res) => {
  res.render('cohorts/new')
})

app.post('/cohorts', (req, res) => {
  let params = req.body
   Cohort.sync({force: true}).then(() => {
     // Table created
     return Cohort.create({
       name: params.name,
       startDate: params.startDate,
       endDate: params.endDate,
       courseId: params.courseId
     });
   });
     res.redirect('cohorts')
})

app.get('/cohorts', (req, res) => {
  let cohorts = []
  Cohort.all().then((cohort) => {
    for (c of cohort) {
      cohorts.push(c)
    }
  }).then(() => {
    res.render('cohorts/index', {cohorts: cohorts})
  })
})

app.get('/users', (req, res) => {
  let users = []
  User.all().then((user) => {
    for (u of user) {
      users.push(u)
    }
  }).then(() => {
    res.render('users/index', {users: users})
  })
})

app.get('/new-course', (req, res) => {
  res.render('courses/new')
})

// Model definition
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  education: Sequelize.INTEGER
});

const Cohort = sequelize.define('cohort', {
  name: Sequelize.STRING,
  courseId: Sequelize.INTEGER,
  startDate: Sequelize.DATEONLY,
  endDate: Sequelize.DATEONLY
});


app.listen(port, () => { console.log(`Express App listening on http://localhost:${port}`)})
