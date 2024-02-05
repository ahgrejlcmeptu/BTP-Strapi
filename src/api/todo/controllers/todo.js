'use strict';

/**
 * todo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::todo.todo',
  ({ strapi }) => ({
    async create(ctx) {
      const todo = ctx
      todo.request.body.data.user = ctx.state.user.id
      const response = await super.create(todo);

      return response;
    },
    async find(ctx) {
      const user = ctx.state.user
      const { data, meta } = await super.find(ctx);

      return data.filter(i => i?.attributes?.user?.data?.id === user.id);
    }
  })
);
