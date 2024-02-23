'use strict';

/**
 * help-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::help-category.help-category', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::help-category.help-category').find(ctx)
  },
}));
