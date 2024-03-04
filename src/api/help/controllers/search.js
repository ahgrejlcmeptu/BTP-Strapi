const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::help.help', ({ strapi }) => ({
  async search(ctx) {
    const data = await strapi.service('api::help.help').search(ctx)
    return data
  },
}));
