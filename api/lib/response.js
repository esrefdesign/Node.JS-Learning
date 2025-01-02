const Enum = require("../config/enum");
const CustomError = require("./error");

class Response {
    constructor(){}

    static successResponse(data,code=200){
        return{
            code,
            data
        }
    }

    static errorResponse(error){
        if(error instanceof CustomError){
            return{
                code: error.code,
                error:{
                    message :error.message,
                    description:error.description
                }
            }
        }
        return{
            code: Enum.HTTP_CODES.INT_SERVER_ERROR,
            error:{
                message :"Unkown Error!",
                description:error.message
            }
        }
    }

}

module.exports = Response;
