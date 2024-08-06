const express = require('express');
const formController = require('../controllers/formController');
const authController = require('../controllers/authController');
const router = express.Router();
router
  .route('/form/:id')
   .get(formController.incrementCount)
router.use(authController.protect);
console.log('test')
router
  .route('/')
  .get(formController.getAllForm)
  .post(
    formController.setUserIds,
    formController.createForm)
  ;
  router
  .route('/:id')
  .get(formController.getForm)
  .patch(formController.updateForm)
  .delete(formController.deleteForm);
module.exports = router;
