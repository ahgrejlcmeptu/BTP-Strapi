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
  },
  async delete(ctx) {
    return await strapi.service('api::newsletter.newsletter').delete(ctx)
  },
  async create(ctx) {
    return await strapi.service('api::newsletter.newsletter').create(ctx)
  },
  async update(ctx) {
    return await strapi.service('api::newsletter.newsletter').update(ctx)
  }
}));
