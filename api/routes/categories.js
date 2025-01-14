var express = require('express');
var router = express.Router();
const Categories = require("../db/models/Categories") 
const Response = require("../lib/response")
const CustomError =require("../lib/error")
const Enum = require("../config/enum")
const AuditLogs= require("../lib/AuditLogs")


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

        
        AuditLogs.info(req.user?.email,"Categories","Add",category);
        
        res.json(Response.successResponse({succses: true}));
        

    } catch (error) {
        let errorResponse=Response.errorResponse(error)
        res.status(errorResponse.code).json(errorResponse)
    }
})


router.post('/update',async(req,res)=>{
    let body = req.body
    try {

        if (!body._id)  throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error!","name field must be")

        let updates = {}
        
        if(body.name) updates.name=body.name;
        if(typeof body.is_active === 'boolean') updates.is_active=body.is_active;

        AuditLogs.info(req.user?.email,"Categories","Add",{_id:body._id , ...updates});
        
        await Categories.updateOne({_id:body._id},updates);

        res.json(Response.successResponse({succses: true}));
        

    } catch (error) {
        let errorResponse=Response.errorResponse(error)
        res.status(errorResponse.code).json(errorResponse)
    }
})


router.post('/delete',async(req,res)=>{
    let body = req.body
    try {

        if (!body._id)  throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error!","name field must be")
        
        await Categories.deleteOne({_id:body._id});
        AuditLogs.info(req.user?.email,"Categories","Delete",{_id:body._id});
        
        res.json(Response.successResponse({succses: true}));
        

    } catch (error) {
        let errorResponse=Response.errorResponse(error)
        res.status(errorResponse.code).json(errorResponse)
    }
})

module.exports = router;


