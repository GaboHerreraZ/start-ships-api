const jwt = require('jsonwebtoken');

function sign(data) {
    return jwt.sign(data, 'claveSecreta');
}

module.exports = {
    sign
}