const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todo.todo', ({ strapi }) => ({
  async three(ctx) {
    const todo = await strapi.service('api::todo.todo').three(ctx)
    return todo
  },
}));
