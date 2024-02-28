'use strict';

const {renderBlock} = require("blocks-html-renderer");
/**
 * service service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service.service', {
  async find(ctx) {
    const data = await strapi.query('api::service.service').findMany({
      populate: true
    });

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: renderBlock(item.description),
      price: item.price,
      ext: item.ext,
      img: item.img?.url,
      speed: item.speed,
      condition: renderBlock(item.condition)
    }))
  },
});
