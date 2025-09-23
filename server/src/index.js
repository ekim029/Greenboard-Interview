require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./routes/routes.js');

app.use(express.json());
app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});