const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ERROR_LITERAL = require('../../constants/error-literal.constant')
const GLOBAL = require('../../constants/global.constant')
const User = require('../../models/user.model')
const apiHelper = require('../../helpers/api.helper')
const ROUTES = require('../../constants/route.constant')
const MODEL = require('../../constants/model.constant')

router.post(`${ROUTES.CREATE_USER.URL}`, async(req,res,next)=>{
 try{
const {body} = req
const email = body.email
// const id = getValueForNextSequence(1)
const isEmailExist = await User.find({email})
if(isEmailExist && Object.keys(isEmailExist).length){
    return apiHelper.failure(res, [], ERROR_LITERAL.COMMON_MESSAGE.IS_EXIST, GLOBAL.STATUS_CODE.BAD_REQUEST)
}

    // const userInstance = new User({_id:id,...body})
    const userInstance = new User({...body})

    const user = await userInstance.save();

    if(user && Object.keys(user).length){
        return apiHelper.success(res, {user}, ERROR_LITERAL.USER.CREATE_USER_SUCCESS, GLOBAL.STATUS_CODE.SUCCESS)
    
    }
return apiHelper.failure(res,[], ERROR_LITERAL.COMMON_MESSAGE.FAILURE, GLOBAL.STATUS_CODE.INTERNAL_SERVER_ERROR)
    }catch(err){
        return apiHelper.failure(res,[err], ERROR_LITERAL.COMMON_MESSAGE.CATCH_ERR, GLOBAL.STATUS_CODE.BAD_REQUEST)
    }
})

router.put(`${ROUTES.UPDATE_USER.URL}`, async(req,res,next)=>{
    try{
        const{body} = req
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id,{...body},{new:true})

        if(user && Object.keys(user).length){
            return apiHelper.success(res, {user}, ERROR_LITERAL.USER.UPDATE_USER_SUCCESS, GLOBAL.STATUS_CODE.SUCCESS)
        }
        return apiHelper.failure(res,[], ERROR_LITERAL.COMMON_MESSAGE.FAILURE, GLOBAL.STATUS_CODE.INTERNAL_SERVER_ERROR)

    }catch(err){
        return apiHelper.failure(res,[err], ERROR_LITERAL.COMMON_MESSAGE.CATCH_ERR, GLOBAL.STATUS_CODE.BAD_REQUEST)

    }
})

router.delete(`${ROUTES.DELETE_USER.URL}`, async(req,res,next)=>{
    try{
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        if(user && Object.keys(user).length){
            return apiHelper.success(res, {user}, ERROR_LITERAL.USER.DELETE_USER_SUCCESS, GLOBAL.STATUS_CODE.SUCCESS)
        }
        return apiHelper.failure(res,[], ERROR_LITERAL.COMMON_MESSAGE.FAILURE, GLOBAL.STATUS_CODE.INTERNAL_SERVER_ERROR)

    }catch(err){
        return apiHelper.failure(res,[err], ERROR_LITERAL.COMMON_MESSAGE.CATCH_ERR, GLOBAL.STATUS_CODE.BAD_REQUEST)

    }
})

router.get(`${ROUTES.GET_USER.URL}`, async(req,res,next)=>{
    try{
        const id = req.params.id
        const user = await User.findById(id)

        if(user && Object.keys(user).length){
            return apiHelper.success(res, {user}, ERROR_LITERAL.USER.GET_USER_SUCCESS, GLOBAL.STATUS_CODE.SUCCESS)
        }
        return apiHelper.failure(res,[], ERROR_LITERAL.COMMON_MESSAGE.FAILURE, GLOBAL.STATUS_CODE.INTERNAL_SERVER_ERROR)

    }catch(err){
        return apiHelper.failure(res,[err], ERROR_LITERAL.COMMON_MESSAGE.CATCH_ERR, GLOBAL.STATUS_CODE.BAD_REQUEST)

    }
})

router.get(`${ROUTES.GET_ALL_USER.URL}`, async(req,res,next)=>{
    try{
        let {search, pageNo, limit} = req.query
        pageNo = parseInt(pageNo)||0;
        limit = parseInt(limit)||3
        if(search){
            const users = await User.find({
                email: {$regex: search, $options: 'i'}
            })
                if(users && Object.keys(users).length){
                         return apiHelper.success(res,{users},ERROR_LITERAL.USER.GET_ALL_USER_SUCCESS, GLOBAL.STATUS_CODE.SUCCESS)
                        }
                        return apiHelper.failure(res,[], ERROR_LITERAL.COMMON_MESSAGE.NO_DATA_FOUND, GLOBAL.STATUS_CODE.SUCCESS)
        }
        if(pageNo && limit){
            const users = await User.find().sort({updated_at:-1}).limit(limit*1).skip((pageNo-1)*limit).exec()
                if(users && Object.keys(users).length){
                         return apiHelper.success(res,{users},ERROR_LITERAL.USER.GET_ALL_USER_SUCCESS, GLOBAL.STATUS_CODE.SUCCESS)
                        }
                        return apiHelper.failure(res,[], ERROR_LITERAL.COMMON_MESSAGE.NO_DATA_FOUND, GLOBAL.STATUS_CODE.SUCCESS)
        }
        const users = await User.find().limit(3)
        if(users && Object.keys(users).length){
                 return apiHelper.success(res,{users},ERROR_LITERAL.USER.GET_ALL_USER_SUCCESS, GLOBAL.STATUS_CODE.SUCCESS)
                }
                return apiHelper.failure(res,[], ERROR_LITERAL.COMMON_MESSAGE.NO_DATA_FOUND, GLOBAL.STATUS_CODE.SUCCESS)

    }
    catch(err){
        return apiHelper.failure(res,[err], ERROR_LITERAL.COMMON_MESSAGE.CATCH_ERR, GLOBAL.STATUS_CODE.BAD_REQUEST)

    }
})


> function getValueForNextSequence(sequenceOfName){
     var sequenceDoc = User.findAndModify({
     query:{_id: sequenceOfName },
         update: {$inc:{sequence_value:1}},
        new:true
   });
    
        return sequenceDoc.sequence_value;
 }
    
module.exports = router