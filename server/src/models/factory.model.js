const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const factorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
factorySchema.plugin(toJSON);
factorySchema.plugin(paginate);

/**
 * @typedef Factory
 */
const Factory = mongoose.model('Factory', factorySchema);

module.exports = Factory;
