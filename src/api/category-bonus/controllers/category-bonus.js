'use strict';

/**
 * category-bonus controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category-bonus.category-bonus', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::category-bonus.category-bonus').find(ctx)
  },
}));
