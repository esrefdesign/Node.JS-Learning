const mongoose = require('mongoose');

const schema=mongoose.Schema({
    role_id:  { type: mongoose.SchemaTypes.ObjectId, required: true },
    user_id:  { type: mongoose.SchemaTypes.ObjectId, required: true },
},{
    versionKey:false,
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

class RolePrivilieges extends mongoose.Model{

}

schema.loadClass(RolePrivilieges);
module.exports = mongoose.model("users",schema)