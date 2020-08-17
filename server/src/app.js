const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');
require('./db/mongoose')();
require('dotenv').config({ path: './config/config.env' });

const userRouters = require('./routers/router-user');
const scoreRouters = require('./routers/router-score');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use(cors());

app.use('/api/users', userRouters);
app.use('/api/scores', scoreRouters);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
