'use strict';

const {renderBlock} = require('blocks-html-renderer')
/**
 * bonus-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bonus-page.bonus-page', {
  async find(ctx) {
    const data = await strapi.query('api::bonus-page.bonus-page').findOne({
      populate: ['banner', 'banner.banner', 'banner.banner.button', 'banner.banner.img', 'banner.banner.img.img', "banner.banner.fon"]
    });

    let banner = data.banner

    banner = banner?.banner.map(item => {
      const {id, title, text, form, button} = item
      const fon = item.fon.url
      const img = item.img.map(i => ({size: i.size, img: i.img.url}))

      return {id, title, text, form, img, fon, button}
    })

    return {title: data.title, description: renderBlock(data.description), banner}
  },
});
