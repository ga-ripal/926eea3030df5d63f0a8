const ROUTES = {
    CREATE_USER:{
        URL:'/user',
        METHOD:'POST'
    },
    UPDATE_USER:{
        URL:'/user/:id',
        METHOD:'PUT'
    },
    DELETE_USER:{
        URL:'/user/:id',
        METHOD:'DELETE'
    },
    GET_ALL_USER:{
        URL:'/users',
        METHOD:'GET'
    },
    GET_USER:{
        URL:'/user/:id',
        METHOD:'GET'
    }
}

module.exports = ROUTES