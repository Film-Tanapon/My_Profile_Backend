const router=require('express').Router();
const controller=require('../controllers/relations.controller');
router.get('/:relation',controller.list);
router.post('/:relation',controller.create);
router.delete('/:relation',controller.remove);
module.exports=router;
