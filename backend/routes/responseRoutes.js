const express = require('express');
const responseController = require('../controllers/responseController');
const authController = require('../controllers/authController');
const router = express.Router();



router
  .route('/')
  .post(
    responseController.createResponse)
  ;
  router
  .route('/:id')
  .patch(responseController.updateResponse)
  .delete(responseController.deleteResponse);
module.exports = router;
