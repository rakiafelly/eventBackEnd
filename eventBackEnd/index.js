const express = require('express');
const cors=require('cors');
const app = express();
const port = 3000;
const dotenv=require('dotenv');
dotenv.config({ debug: process.env.DEBUG });

//connect to database
require('./database/connect')
app.use(express.json())
app.use(cors());
const authApi=require('./routes/authApi');
const companyApi=require('./routes/companyApi');
const eventApi=require('./routes/eventApi');
const tagApi=require('./routes/tagApi');
app.use('/api/v1', authApi);
app.use('/api/v1', companyApi);
app.use('/api/v1', eventApi);
app.use('/api/v1', tagApi);


app.listen(port, () => {
    console.log(`Event app listening on port ${port}`)
  })