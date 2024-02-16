'use strict';

/**
 * article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article', {
  async find(ctx) {
    const data = await strapi.query('api::article.article').findMany({
      populate: ['card', 'card.img', 'card.category'],
    });

    return data.map(({id, card} = item) => {
      const {title, date, img, category} = card
      return {id, title, date, img: img.formats.thumbnail.url, category: category.id}
      }
    )
  },
});
