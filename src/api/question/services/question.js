'use strict';

const {renderBlock} = require("blocks-html-renderer");
/**
 * question service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::question.question', {
  async find(ctx) {
    const data = await strapi.query('api::question.question').findMany({
      populate: true
    });

    return data.map(item => ({id: item.id, title: item.title, description: renderBlock(item.description), persons: item.persons, category: item.category.title}))
  },
});
