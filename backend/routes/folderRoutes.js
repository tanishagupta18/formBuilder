const express = require('express');
const folderController = require('../controllers/folderController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);
router
  .route('/')
  .get(folderController.getAllFolder)
  .post(
    folderController.setUserIds,
    folderController.createFolder)
  ;
  router
  // .route('/:id').patch(folderController.updateFolder)
  .delete(folderController.deleteFolder);
module.exports = router;
