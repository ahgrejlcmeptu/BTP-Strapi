'use strict';

/**
 * article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article', {
  async find(ctx) {
    const article = await strapi.query('api::article.article').findWithCount({
      populate: ['Card', 'Card.img.media'],
    });

    return article[0].map(item => {
      const obj = {...item, ...item.Card, img: item.Card.img.formats.thumbnail.url}
      delete  obj.Card

      return obj
    })
  },
  async findOne(ctx) {
    const article = await strapi.query('api::article.article').findOne({
      populate: ['Page', 'Page.img'],
      where: {id: ctx.request.params.id}
    });

    return article
  },
});
