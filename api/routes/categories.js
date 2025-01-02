var express = require('express');
var router = express.Router();
const Categories = require("../db/models/Categories") 
const Response = require("../lib/response")
const CustomError =require("../lib/error")
const Enum = require("../config/enum")

/* GET users listing. */
router.get('/', async function(req, res, next){
    try {
        let categories =await Categories.find({}); 

        res.json(Response.successResponse(categories));
    } catch (error) { 
        let errorResponse=Response.errorResponse(error)
        res.status(errorResponse.code).json(Response.errorResponse(error));
    }
});


router.post('/add',async(req,res)=>{
    let body=req.body;
    try {
        if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error!","name field must be");

        let category = new Categories({
            name: body.name,
            is_active: true,
            created_by:req.user?.id,
        });

        await category.save();

        res.json(Response.successResponse({succses: true}));
        

    } catch (error) {
        let errorResponse=Response.errorResponse(error)
        res.status(errorResponse.code).json(errorResponse)
    }
})

module.exports = router;


