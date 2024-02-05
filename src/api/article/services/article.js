'use strict';

/**
 * article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article', {
  async find(ctx) {
    const article = await strapi.query('api::article.article').findWithCount({
      populate: {
        img: true,
      },
    });

    return article[0].map(item => ({...item, img: item.img[0].formats.thumbnail.url}))
  },
});
