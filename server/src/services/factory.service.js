const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Factory = require('../models/factory.model');

/**
 * Create a factory
 * @param {Object} factoryBody
 * @returns {Promise<Factory>}
 */
const createFactory = async (factoryBody) => {
  return Factory.create(factoryBody);
};

/**
 * Query for factories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFactories = async (filter, options) => {
  const factories = await Factory.paginate(filter, options);
  return factories;
};

/**
 * Get factory by id
 * @param {ObjectId} id
 * @returns {Promise<Factory>}
 */
const getFactoryById = async (id) => {
  return Factory.findById(id);
};

/**
 * Update factory by id
 * @param {ObjectId} factoryId
 * @param {Object} updateBody
 * @returns {Promise<Factory>}
 */
const updateFactoryById = async (factoryId, updateBody) => {
  const factory = await getFactoryById(factoryId);
  if (!factory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Factory not found');
  }

  Object.assign(factory, updateBody);
  await factory.save();
  return factory;
};

/**
 * Delete factory by id
 * @param {ObjectId} factoryId
 * @returns {Promise<Factory>}
 */
const deleteFactoryById = async (factoryId) => {
  const factory = await getFactoryById(factoryId);
  if (!factory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Factory not found');
  }
  await factory.remove();
  return factory;
};

module.exports = {
  createFactory,
  queryFactories,
  getFactoryById,
  updateFactoryById,
  deleteFactoryById,
};
