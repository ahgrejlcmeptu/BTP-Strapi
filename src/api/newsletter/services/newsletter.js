'use strict';

const {renderBlock} = require("blocks-html-renderer");
/**
 * newsletter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newsletter.newsletter', {
  async find(ctx) {
    const data = await strapi.query('api::newsletter.newsletter').findMany()

    return data.map(item => {
      delete item.data
      return item
    })
  },
  async findOne(ctx) {

    const data = await strapi.entityService.findOne('api::newsletter.newsletter', ctx.params.id,);

    return data
  },
});
