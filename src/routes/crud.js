const express=require('express');
const createController=require('../controllers/crud.controller');
module.exports=function createCrudRouter(config) {
  const router=express.Router(),controller=createController(config);
  router.get('/',controller.list);
  router.get('/:id',controller.get);
  router.post('/',controller.create);
  router.put('/:id',controller.replace);
  router.patch('/:id',controller.update);
  router.delete('/:id',controller.remove);
  return router;
};
