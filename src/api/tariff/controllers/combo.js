const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tariff.tariff', ({ strapi }) => ({
  async combo(ctx) {
    const data = await strapi.service('api::tariff.tariff').combo(ctx)
    return data
  },
}));
