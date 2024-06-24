'use strict';
const {newsletterSend, newsletterStop} = require("../../../admin/newsletter");
/**
 * newsletter service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newsletter.newsletter', {
  async find(ctx) {
    const data = await strapi.query('api::newsletter.newsletter').findMany()

    return data.map(item => {
      delete item.data
      return item
    })
  },
  async findOne(ctx) {
    const data = await strapi.entityService.findOne('api::newsletter.newsletter', ctx.params.id);
    return data
  },
  async delete(ctx) {
    const data = await strapi.entityService.delete('api::newsletter.newsletter', ctx.params.id);
    newsletterStop(ctx.params.id)
    return data
  },
  async create(ctx) {
    const entry = ctx.request.body

    const data = await strapi.entityService.create('api::newsletter.newsletter', {data: entry.body});
    return {data}
  },
  async update(ctx) {
    const entry = ctx.request.body

    const data = await strapi.entityService.update('api::newsletter.newsletter', ctx.params.id, {data: entry.body});

    if (data.active) newsletterSend(data, ctx.params.id)

    return data
  },
  async action(ctx) {
    console.log('пробуем отправить')
    const data = await strapi.entityService.update('api::newsletter.newsletter', ctx.params.id, {
      data: ctx.request.body
    });

    const body = ctx.request.body

    newsletterSend(body, ctx.params.id)

    return data
  },
});
