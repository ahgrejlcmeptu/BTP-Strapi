'use strict';

/**
 * help controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::help.help', ({ strapi }) => ({
  async findOne(ctx) {
    return await strapi.service('api::help.help').findOne(ctx)
  },
  async update(ctx) {
    return await strapi.service('api::help.help').update(ctx)
  }
}));
