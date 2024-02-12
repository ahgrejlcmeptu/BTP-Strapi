'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article',
  ({ strapi }) => ({
    async find(ctx) {
      const article = await strapi.service('api::article.article').find(ctx)
      return article
    },
    async findOne(ctx) {
      const article = await strapi.service('api::article.article').findOne(ctx)
      return article
    }
  })
);
