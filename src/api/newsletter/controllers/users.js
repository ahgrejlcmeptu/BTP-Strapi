const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::newsletter.newsletter', ({ strapi }) => ({
  async users(ctx) {
    return await strapi.service('api::newsletter.newsletter').users(ctx)
  }
}));
