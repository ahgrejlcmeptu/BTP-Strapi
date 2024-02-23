'use strict';

const {renderBlock} = require("blocks-html-renderer");
/**
 * help-category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help-category.help-category', {
  async find(ctx) {
    const data = await strapi.query('api::help-category.help-category').findMany({
      populate: ['helps']
    });

    return data.map(({id, title, helps}) => {
        return {id, title, helps: helps.map(item => ({id: item.id, title: item.title, description: renderBlock(item.description)}))}
      }
    )
  },
});
