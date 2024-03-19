'use strict';
/**
 * newsletter service
 */

const {createCoreService} = require('@strapi/strapi').factories;

const newsletter = {}

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
  async action(ctx) {
    const data = await strapi.entityService.update('api::newsletter.newsletter', ctx.params.id, {
      data: ctx.request.body
    });
    // console.log(data)
    // console.log(newsletter)
    return data
  },
});
