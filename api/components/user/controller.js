const TABLE = 'user';
const nanoid = require('nanoid');
const auth = require('../auth');


module.exports = function (injectedStore) {
    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    async function upsert(body) {
        const user = {
            id: nanoid.nanoid(),
            first_name: body.first_name,
            last_name: body.last_name,
            user_name: body.user_name,
            email: body.email
        };

        if(body.password || body.username) {
            await auth.upsert({
                id: user.id,
                user_name: user.user_name,
                password: body.password
            });
        }

        console.log(user);
        return store.upsert(TABLE, user);
    }


    return {
        upsert
    }

}