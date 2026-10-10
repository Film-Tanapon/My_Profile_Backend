const router=require('express').Router();
const {uploadImage,uploadRoot}=require('../middleware/image-upload');
const controller=require('../controllers/uploads.controller');
router.post('/images',uploadImage.single('image'),controller.create);
module.exports={uploadsRouter:router,uploadRoot};
