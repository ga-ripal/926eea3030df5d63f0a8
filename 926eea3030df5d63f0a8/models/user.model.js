const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {USER} = require('../constants/model.constant')

const userSchema  = new Schema({
    id:{

    },
    firstName:{
type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model(USER,userSchema)
