const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const factoryValidation = require('../../validations/factory.validation');
const factoryController = require('../../controllers/factory.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageFactories'), validate(factoryValidation.createFactory), factoryController.createFactory)
  .get(auth('manageFactories'), validate(factoryValidation.getFactories), factoryController.getFactorys);

router
  .route('/:factoryId')
  .get(auth('manageFactories'), validate(factoryValidation.getFactory), factoryController.getFactory)
  .patch(auth('manageFactories'), validate(factoryValidation.updateFactory), factoryController.updateFactory)
  .delete(auth('manageFactories'), validate(factoryValidation.deleteFactory), factoryController.deleteFactory);

module.exports = router;
