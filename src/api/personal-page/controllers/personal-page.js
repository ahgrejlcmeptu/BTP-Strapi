'use strict';

/**
 * personal-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::personal-page.personal-page', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::personal-page.personal-page').find(ctx)
  },
}));
