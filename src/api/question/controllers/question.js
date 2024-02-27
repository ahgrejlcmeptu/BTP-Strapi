'use strict';

/**
 * question controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::question.question', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::question.question').find(ctx)
  },
}));
