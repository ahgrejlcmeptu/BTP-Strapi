'use strict';

/**
 * tariff controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tariff.tariff', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::tariff.tariff').find(ctx)
  },
}));
