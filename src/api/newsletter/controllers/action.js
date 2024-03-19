const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::help.help', ({ strapi }) => ({
  async action(ctx) {
    return await strapi.service('api::newsletter.newsletter').action(ctx)
  }
}));
