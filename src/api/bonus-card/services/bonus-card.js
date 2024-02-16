'use strict';

/**
 * bonus-card service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bonus-card.bonus-card', {
  async find(ctx) {
    const data = await strapi.query('api::bonus-card.bonus-card').findMany({
      populate: ['img', 'categories'],
    });

    return data.map(({id, label, title, text, btn, img, categories} = item) => ({
      id, label, title, text, btn, img: img.url, categories: categories.map(i => i.id)
    }))
  },
});
