'use strict';

/**
 * home-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::home-page.home-page').find(ctx)
  },
}));
