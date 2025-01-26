const mongoose = require('mongoose');
const _enum = require('../../config/enum');
const is = require('is_js');
const CustomError = require('../../lib/error');
const bcrypt = require('bcrypt-nodejs');

const schema=mongoose.Schema({
    email:{type: String,required:true,unique:true},
    password: {type: String,required:true},
    is_active:{type: Boolean,default:true},
    first_name:String,
    last_name:String,
    phone_number:String,
    roles:{type:Array}
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

class Users extends mongoose.Model{
    
    validPassword(password){
        return bcrypt.compareSync(password,this.password)
    }

    static validateFieldsBeforeAuth(email,password){
        if(typeof password !== "string" || password.length < _enum.PASS_LENGHT || is.not.email(email))  {
            throw new CustomError(_enum.HTTP_CODES.UNAUTHORIZED, "Validation error ","Email or password is Wrong");
            
            
        }  
        return null;  
    }

}

schema.loadClass(Users);
module.exports = mongoose.model("users",schema)