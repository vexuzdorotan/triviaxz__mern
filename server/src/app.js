const express = require('express');
require('./db/mongoose');
require('dotenv').config();

const userRouters = require('./routers/router-user');
const scoreRouters = require('./routers/router-score');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/users', userRouters);
app.use('/api/scores', scoreRouters);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
