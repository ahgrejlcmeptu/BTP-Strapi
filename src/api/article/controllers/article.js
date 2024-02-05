'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article',
  ({ strapi }) => ({
    async find(ctx) {
      const article = await strapi.service('api::article.article').find(ctx)

      // console.log(article[0][0])

      return article
    }
  })
);
