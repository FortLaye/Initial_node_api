require('dotenv').config();
const express = require('express');
const apiRoutes = require('./api.routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', apiRoutes);

app.get('/api', (req, res) => {
    res.send('Hello World!');
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});

