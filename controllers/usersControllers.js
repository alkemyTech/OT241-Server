let {User} = require('../models')
let {body,validationResult} = require('express-validator')
let {encrypt,compare} = require('../helpers/handleEncrypt.js')
let jwt = require('jsonwebtoken')

let createToken = require('../helpers/createToken.js')


const getAllUsers = async (req,res,next) => {
    try{
        let users = await User.findAll({})
    
        return res.json(users)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

const createUser = async (req,res,next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    
        let {firstName,lastName,email,password} = req.body
        
        let myUser = await User.findOne({
            where:{email}
        })

        let myPasswordEncrypt = await encrypt(password) 
        
        if(myUser != null){
            return res.status(400).send({errors:'The email already register.'})
        }else{
            let myNewUser = await User.create({
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : myPasswordEncrypt,
                roleId : 2
            })
        
            return res.json(myNewUser)
        }
        

    }catch(err){
        console.log(err)
    }
}

const getOneUser = async (req,res,next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        let {email, password} = req.body
        let myUser = await User.findOne({
            where:{email}
        })
        let checkPassword = await compare(password, myUser.password)

        if(!myUser){
            res.status(404)
            res.json({text:'Usuario no encontrado'})
        }
        
        if(checkPassword){
            let myToken = createToken()
            res.json({
                data: myUser,
                token: myToken
            })
        }else{
            res.status(404)
            res.json({text:'Contraseña incorrecta'})
        }
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({ok:false})
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getOneUser
}
