require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const auth = require('./routes/auth');
const users = require('./routes/users');
const lckd = require('./routes/lckd');

const App = express();

App.use(helmet());
App.use(cors());
App.use(express.json());

App.use('/auth', auth);
App.use('/users', users);
App.use('/lckd', lckd);


App.listen(3000, () => {
    console.log('Super secure server is up n running!')
})