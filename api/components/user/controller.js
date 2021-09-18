const TABLE = 'user';
const nanoid = require('nanoid');

module.exports = function (injectedStore) {
    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    function upsert(body) {
        const user = {
            id: nanoid.nanoid(),
            first_name: body.first_name,
            last_name: body.last_name,
            user_name: body.user_name,
            email: body.email
        };

        console.log(user);
        return store.upsert(TABLE, user);
    }


    return {
        upsert
    }

}