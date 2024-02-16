'use strict';

/**
 * article-category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article-category.article-category', {
  async find(ctx) {
    const data = await strapi.query('api::article-category.article-category').findMany();

    return data.map(({id, title} = item) => {
        return {id, title}
      }
    )
  },
});
