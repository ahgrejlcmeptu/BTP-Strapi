'use strict';

/**
 * bonus-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bonus-page.bonus-page', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::bonus-page.bonus-page').find(ctx)
  },
}));
