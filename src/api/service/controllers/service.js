'use strict';

/**
 * service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service.service', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::service.service').find(ctx)
  },
}));

