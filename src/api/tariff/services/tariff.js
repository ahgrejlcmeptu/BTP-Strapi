'use strict';
const {renderBlock} = require('blocks-html-renderer')

/**
 * tariff service
 */

function byField(fieldName, number) {
  if (number) return (a, b) => +a[fieldName] > +b[fieldName] ? 1 : -1;
  return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tariff.tariff', {
  async find(ctx) {
    const data = await strapi.query('api::tariff.tariff').findMany({
      populate: true
    });

    return data.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: renderBlock(item.description),
      speed: item.speed.split(', '),
      categories: item.categories.map(i => i.id),
      discount: item.discount
    }))
  },
  async recommendation(ctx) {
    const data = await strapi.query('api::tariff-category.tariff-category').findMany({
      populate: ['tarifies', 'tarifies.categories']
    });
    const tariffs = []

    data.forEach(list => {
      let tarifies = list.tarifies

      if (!tarifies.length) return

      tarifies = tarifies.filter(item => item.categories.length === 1)

      tarifies.sort(byField('price', true)).reverse()
      const item = tarifies[0]

      tariffs.push({
        id: item.id,
        title: item.title,
        price: item.price,
        description: renderBlock(item.description),
        speed: item.speed.split(', '),
        categories: list.id,
        discount: item.discount
      })
    })

    return tariffs
  },
  async combo(ctx) {
    const data = await strapi.query('api::tariff.tariff').findMany({
      populate: true
    });

    const combo = data.filter(item => item.categories.length > 1)

    return combo.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: renderBlock(item.description),
      speed: item.speed.split(', '),
      categories: item.categories.map(i => i.id),
      discount: item.discount
    }))
  },
});
