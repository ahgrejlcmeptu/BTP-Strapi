'use strict';

/**
 * tariff-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tariff-category.tariff-category', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::tariff-category.tariff-category').find(ctx)
  },
}));
