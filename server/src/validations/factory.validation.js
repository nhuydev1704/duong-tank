const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFactory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.object().required(),
  }),
};

const getFactories = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFactory = {
  params: Joi.object().keys({
    factoryId: Joi.string().custom(objectId),
  }),
};

const updateFactory = {
  params: Joi.object().keys({
    factoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      location: Joi.object(),
    })
    .min(1),
};

const deleteFactory = {
  params: Joi.object().keys({
    factoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFactory,
  getFactories,
  getFactory,
  updateFactory,
  deleteFactory,
};
