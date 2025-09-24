require('dotenv').config();

const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

const routes = require('./routes/routes.js');

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.use('/snapshots', express.static(path.join(__dirname, '../snapshots')));

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});