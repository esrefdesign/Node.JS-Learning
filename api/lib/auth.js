const passport = require("passport");
const {ExtractJwt,Strategy } = require("passport-jwt");
const Users = require("../db/models/Users")
const UserRoles = require("../db/models/UserRoles");
const RolePrivileges = require("../db/models/RolePrivileges");

const config = require("../config");

module.exports = function () {
    let startegy = new Strategy({
        secretOrKey : config.JWT.SECRET,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    },async (payload, done) => {
        try {
            let user = await Users.findOne({_id:payload.id});
        
        if(user){

            let userRoles = await UserRoles.findOne({user_id:user._id});

            let rolePrivileges = await RolePrivileges.find({role_id:{$in : userRoles.map(ur=>ur.role_id)}});

            done(null,{
                id:user._id,
                roles:rolePrivileges,
                email: user.email,
                first_name:user.first_name,
                last_name:user.last_name,
                exp: parseInt(Date.now/1000) * config.JWT.EXPIRE_TIME,
            })
        }else{(
            done(new Error("User Not FOund"),null))
        }
        } catch (error) {
            done(error,null)
        }
        
    })

    passport.use(startegy);


    return{
        initialize:function() {
            return passport.initialize();

        },
        
        authenticate: function() {
            return passport.authenticate("jwt",{session:false})
        }
    };
}

    