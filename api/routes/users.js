var express = require('express');
const users = require('../db/models/Users');
const Response = require('../lib/response');
const CustomError = require('../lib/error');
const _enum = require('../config/enum');
const bcrypt = require('bcrypt-nodejs');
const is = require("is_js")
const Roles = require("../db/models/Roles")
const UserRoles = require("../db/models/UserRoles")


var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next)=> {
  try {
    let users = await Users.find({});

    res.json(Response.successResponse(users))

  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse)
  }
});
//

 
router.post('/add', async(req, res, next)=> {
  let body = req.body;
  
  try {
    if(!body.email) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"validation error,email");
    if(is.not.email(body.email)) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"please enter a true email format ");

    if(!body.password) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"validation error,password");
    
    if(body.password.lenght < _enum.PASS_LENGHT){
      throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"Validation error password must be greater than",_enum.PASS_LENGHT);
    } 
    if(!body.roles || !Array.isArray(body.roles) ||body.roles.lenght==0) {
      throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"Validation error,roles must be an array")
    }
    let roles = await Roles.find({_id:{$in:body.roles}})

    if(roles.lenght==0){
       throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"Validation error,roles must be an array")
    }
    
    let password = bcrypt.hashSync(body.password,bcrypt.genSaltSync(8),null)
    
    await users.create({
      email:body.email,
      password,
      is_active:true,
      first_name:body.first_name,
      last_name:body.last_name,
      phone_number:body.phone_number,
      roles:roles
    });

    for (let i = 0; i < body.roles.length; i++) {
      await UserRoles.create({
        role_id: body.roles[i]._id,
        user_id: body._id
      })
      
    }
    
    res.status(_enum.HTTP_CODES.CREATED).json(Response.successResponse({succes: true,},_enum.HTTP_CODES.CREATED));

  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse)
  }
});

router.post("/update",async(req,res,next)=>{

  try {
    let body = req.body;
    let updates = {};

    if(!body._id) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"Validation Error _id must bi filled")

    if(body.password && body.password< _enum.PASS_LENGHT){
      updates.password = bcrypt.hashSync(body.password,bcrypt.genSaltSync(8),null)
    }
    
    if(typeof body.is_active === "boolean") updates.is_active=body.is_active;
    if(body.first_name) updates.first_name=body.first_name;
    if(body.last_name) updates.last_name=body.last_name;
    if(body.phone_number) updates.phone_number=body.phone_number;

    if(Array.isArray(body.roles)&&body.roles.lenght > 0) {

      let userRoles = await UserRoles.find({user_id:body._id})

      let removedRoles = userRoles.filter(x=>!body.roles.includes(x.role_id.tostring()))
      let newRoles = body.roles.filter(x=>!userRoles.map(r =>r.role_id).includes(x))
      if(removedRoles.length>0){
          await UserRoles.deleteMany({_id:{$in: removedRoles.map(x=>x._id.tostring())}})
      }

            if (newRoles.length>0) {
                for(let i =0;i<newRoles.length;i++){
                    let userRole = new UserRoles({
                        role_id:newRoles[i],
                        user_id:body._id,
                        
                    })
        
                    await userRole.save();
                }
            }



    }
    let roles = await Roles.find({_id:{$in:body.roles}})
    updates.roles=roles
    if(roles.lenght==0){
       throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"Validation error,roles must be an array")
    }
    

    await users.updateOne({_id:body._id},updates);
    res.json(Response.successResponse({succes: true,}));
    

  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse)
  }


})

router.post('/delete',async(req,res,next)=>{

  try {
    let body = req.body;

    if(!body._id) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"Validation Error _id must bi filled")

    await users.deleteOne({_id:body._id});

    await UserRoles.deleteMany({user_id:body._id});


    res.json(Response.successResponse({succes: true,}));
    

  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse)
  }
})


router.post('/register', async(req, res, next)=> {
  let body = req.body;
  
  let user = await users.findOne({});

  if(!user){
    return res.sendStatus(_enum.HTTP_CODES.NOT_FOUND)
  }

  try {
    if(!body.email) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"validation error,email");
    if(is.not.email(body.email)) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"please enter a true email format ");

    if(!body.password) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"validation error,password");
    
    if(body.password.lenght < _enum.PASS_LENGHT){
      throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"Validation error password must be greater than",_enum.PASS_LENGHT);
    } 

    
    let password = bcrypt.hashSync(body.password,bcrypt.genSaltSync(8),null)
   
    let createdUser= await users.create({
      email:body.email,
      password,
      is_active:true,
      first_name:body.first_name,
      last_name:body.last_name,
      phone_number:body.phone_number,
    });

    let role = await Roles.create({
      role_name : _enum.SUPER_ADMIN,
      is_active: true,
      created_by: createdUser._id
    });

    

    await UserRoles.create({
      role_id: role._id,
      user_id: createdUser._id
    })

    
    res.status(_enum.HTTP_CODES.CREATED).json(Response.successResponse({succes: true,},_enum.HTTP_CODES.CREATED));

  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse)
  }
});

module.exports = router;
