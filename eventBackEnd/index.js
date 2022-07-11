const express = require('express');
const cors=require('cors');
const app = express();
const session=require('express-session');
const port = 3000;
const passport=require('passport')
const dotenv=require('dotenv');
dotenv.config({ debug: process.env.DEBUG });

//connect to database
require('./database/connect')
// use passport
require('./passport/passport');
app.use(express.json())
app.use(cors());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());
const authApi=require('./routes/authApi');
const companyApi=require('./routes/companyApi');
const eventApi=require('./routes/eventApi');
const tagApi=require('./routes/tagApi');
const reservationApi=require('./routes/reservationApi');


app.use('/api/v1', authApi);
app.use('/api/v1', companyApi);
app.use('/api/v1', eventApi);
app.use('/api/v1', tagApi);
app.use('/api/v1',reservationApi);


app.listen(port, () => {
    console.log(`Event app listening on port ${port}`)
  })