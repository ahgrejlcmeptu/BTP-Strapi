'use strict';

/**
 * bumph service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bumph.bumph', {
  async find(ctx) {
    const data = await strapi.query('api::bumph.bumph').findMany({
      populate: true
    });
    return data.map(i => ({id: i.id, title: i.title, file: {ext: i.file.ext, url: i.file.url, size: i.file.size} }))
  },
});
