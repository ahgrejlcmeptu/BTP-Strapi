'use strict';

/**
 * category-bonus service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::category-bonus.category-bonus', {
  async find(ctx) {
    const data = await strapi.query('api::category-bonus.category-bonus').findMany({
      populate: ['bonusies']
    });

    return data.map(({id, title, bonusies} = item) => {
        return {id, title, bonusies: bonusies.length}
      }
    )
  },
});
