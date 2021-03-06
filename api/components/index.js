const express = require('express');
const config = require('../../config');
const cors = require('cors');

//Controllers
const user = require('../components/user/network');
const auth = require('../components/auth/network');



const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));

//Router
app.use('/api/user', user);
app.use('/api/auth', auth);



app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto', config.api.port);
});