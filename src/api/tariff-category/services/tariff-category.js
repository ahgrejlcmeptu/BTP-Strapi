'use strict';

/**
 * tariff-category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tariff-category.tariff-category', {
  async find(ctx) {
    const data = await strapi.query('api::tariff-category.tariff-category').findMany();

    return data.map(({id, title} = item) => {
        return {id, title}
      }
    )
  },
});
