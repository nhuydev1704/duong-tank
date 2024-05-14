const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { factoryService } = require('../services');

const createFactory = catchAsync(async (req, res) => {
  const factory = await factoryService.createFactory(req.body);
  res.status(httpStatus.CREATED).send(factory);
});

const getFactories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await factoryService.queryFactories(filter, options);
  res.send(result);
});

const getFactory = catchAsync(async (req, res) => {
  const factory = await factoryService.getFactoryById(req.params.factoryId);
  if (!factory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'factory not found');
  }
  res.send(factory);
});

const updateFactory = catchAsync(async (req, res) => {
  const factory = await factoryService.updateFactoryById(req.params.factoryId, req.body);
  res.send(factory);
});

const deleteFactory = catchAsync(async (req, res) => {
  await factoryService.deleteFactoryById(req.params.factoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFactory,
  getFactories,
  getFactory,
  updateFactory,
  deleteFactory,
};
