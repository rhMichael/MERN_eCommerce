const express = require('express');
const app = express();
app.use(express.json());
  
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;

const usersRoute = require('./routers/usersRoute');

app.use('/api/users', usersRoute);
 
app.listen(port, () => console.log(`Node JS Server started on port ${port}`));

