const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tariff.tariff', ({ strapi }) => ({
  async recommendation(ctx) {
    const data = await strapi.service('api::tariff.tariff').recommendation(ctx)
    return data
  },
}));
