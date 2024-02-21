'use strict';

/**
 * home-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-page.home-page',{
  async find(ctx) {
    const data = await strapi.query('api::home-page.home-page').findOne({
      populate: ['banner', 'banner.button', 'banner.img', 'banner.img.img', "banner.fon"],
    });

    let banner = data.banner

    banner = banner.map(item => {
      const {id, title, text, form} = item
      const fon = item.fon.url
      const img = item.img.map(i => ({size: i.size, img: i.img.formats.thumbnail.url}))

      return {id, title, text, form, img, fon}
    })

    return {banner}
  },
});
