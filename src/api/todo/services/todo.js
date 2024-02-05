'use strict';

/**
 * todo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todo.todo', {
  async three(ctx) {
    const { id } = ctx.state.user;

    const todos = await strapi.query('api::todo.todo').findWithCount({
      orderBy: { createdAt: 'desc' },
      limit: 3,
      where: {
        done: false,
        user: id
      },
      populate: {
        user: true,
      },
    });

    return todos
  },
});
