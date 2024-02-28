'use strict';
const {renderBlock} = require('blocks-html-renderer')
/**
 * tariff service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tariff.tariff', {
  async find(ctx) {
    const data = await strapi.query('api::tariff.tariff').findMany({
      populate: true
    });

    return data.map(item => ({id: item.id, title: item.title, price: item.price, description: renderBlock(item.description), speed: item.speed.split(', '), category: item.category.title, discount: item.discount}))
  },
});
