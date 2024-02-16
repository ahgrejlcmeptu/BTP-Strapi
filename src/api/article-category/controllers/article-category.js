'use strict';

/**
 * article-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article-category.article-category', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::article-category.article-category').find(ctx)
  },
}));
