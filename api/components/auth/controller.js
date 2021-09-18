const auth =  require('../../../auth/index');
const bcrypt =  require('bcrypt');
const TABLE =  'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLE, { user_name: username});
        return bcrypt.compare(password, data.password)
                .then(equal => {
                    if(equal) {
                        return auth.sign(data);
                    } else  {
                        throw new Error('Credenciales invalidas');
                    }
                });
    }


    async function upsert(data) {
        const authData = {
            id: data.id,
        }

        if(data.user_name){
            authData.user_name = data.user_name
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5)
        }

        return store.upsert(TABLE, authData);
    }

    return {
        upsert,
        login
    }
}

