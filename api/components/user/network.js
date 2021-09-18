const express =  require('express');
const router  = express.Router();


const response = require('../../../network/response');
const controller = require('./index');

router.post('/', (req, res) => {
    const user = req.body;
    controller.upsert(user)
        .then((userData)=> {
            response.success(res, userData, 200);
        })
        .catch( error => {
            response.error(res, error.message, 500);
        })
});

module.exports = router;