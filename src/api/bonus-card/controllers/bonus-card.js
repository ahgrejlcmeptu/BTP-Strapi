'use strict';

/**
 * bonus-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bonus-card.bonus-card', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::bonus-card.bonus-card').find(ctx)
  },
}));
