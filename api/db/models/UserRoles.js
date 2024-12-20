const mongoose = require('mongoose');

const schema=mongoose.Schema({
    role_name:  { type: String, required: true },
    is_active:{type: Boolean, default:true},
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    },
},{
    versionKey:false,
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

class UserRoles extends mongoose.Model{

}

schema.loadClass(UserRoles);
module.exports = mongoose.model("users",schema)