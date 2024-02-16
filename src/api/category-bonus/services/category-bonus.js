'use strict';

/**
 * category-bonus service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::category-bonus.category-bonus', {
  async find(ctx) {
    const data = await strapi.query('api::category-bonus.category-bonus').findMany();

    return data.map(({id, title} = item) => {
        return {id, title}
      }
    )
  },
});
