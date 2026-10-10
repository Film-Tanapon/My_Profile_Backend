const createService = require('../services/crud.service');
module.exports = function createCrudController(config) {
  const service=createService(config);
  const handle=fn=>async(req,res,next)=>{try{await fn(req,res);}catch(error){next(error);}};
  return {
    list:handle(async(req,res)=>res.json({success:true,data:await service.list(typeof req.query.q==='string'?req.query.q.trim():'')})),
    get:handle(async(req,res)=>{const data=await service.get(Number(req.params.id));if(!data)return res.status(404).json({success:false,message:'Record not found'});res.json({success:true,data});}),
    create:handle(async(req,res)=>res.status(201).json({success:true,data:await service.save(req.body,null,false)})),
    replace:handle(async(req,res)=>res.json({success:true,data:await service.save(req.body,Number(req.params.id),false)})),
    update:handle(async(req,res)=>res.json({success:true,data:await service.save(req.body,Number(req.params.id),true)})),
    remove:handle(async(req,res)=>{await service.remove(Number(req.params.id));res.json({success:true,message:'Record deleted successfully'});})
  };
};
