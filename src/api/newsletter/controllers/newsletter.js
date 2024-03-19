'use strict';

/**
 * newsletter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::newsletter.newsletter', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::newsletter.newsletter').find(ctx)
  },
  async findOne(ctx) {
    return await strapi.service('api::newsletter.newsletter').findOne(ctx)
  }
}));
