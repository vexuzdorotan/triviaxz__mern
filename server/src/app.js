const fs = require('fs');
const path = require('path');

const express = require('express');
require('./db/mongoose')();
require('dotenv').config({ path: './config/config.env' });

const userRouters = require('./routers/router-user');
const scoreRouters = require('./routers/router-score');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
  });

  next();
});

app.use('/api/users', userRouters);
app.use('/api/scores', scoreRouters);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
