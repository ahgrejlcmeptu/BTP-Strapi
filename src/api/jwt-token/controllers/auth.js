const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::jwt-token.jwt-token', ({ strapi }) => ({
  async login(ctx) {
    return await strapi.service('api::jwt-token.jwt-token').login(ctx)
  },
  async logout(ctx) {
    return await strapi.service('api::jwt-token.jwt-token').logout(ctx)
  },
}));
