const express =  require('express');
const router = express.Router();

const response = require('../../../network/response')
const controller = require('./index');

router.post('/',(req, res) => {
    controller.login(req.body.user_name, req.body.password)
            .then((token) => {
                console.log('token', token);
                response.success(res, token, 200);
            })
            .catch((e) => {
                console.log('error',e);
                response.error( res, 'Información invalida'+ e, 400);
            });
});

module.exports = router;