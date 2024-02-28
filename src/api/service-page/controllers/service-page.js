'use strict';

/**
 * service-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-page.service-page', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::service-page.service-page').find(ctx)
  },
}));
