'use strict';

/**
 * personal-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::personal-page.personal-page',{
  async find(ctx) {
    const data = await strapi.query('api::personal-page.personal-page').findOne({
      populate: ['banner', 'banner.banner', 'banner.banner.button', 'banner.banner.img', 'banner.banner.img.img', "banner.banner.fon"]
    });

    let banner1 = data.banner1
    let banner2 = data.banner2
    let tied = {id: data.tied.id, title: data.tied.title, text: data.tied.text, img: data.tied.img, fon: data.tied.fon.url, button: data.tied.button}

    tied.img = tied.img.map(i => ({size: i.size, img: i.img.url}))

    banner1 = banner1.map(item => {
      const {id, title, text, form, button} = item
      const fon = item.fon.url
      const img = item.img.map(i => ({size: i.size, img: i.img.url}))

      return {id, title, text, form, img, fon, button}
    })

    banner2 = banner2.map(item => {
      const {id, title, text, form, button} = item
      const fon = item.fon.url
      const img = item.img.map(i => ({size: i.size, img: i.img.url}))

      return {id, title, text, form, img, fon, button}
    })

    return {banner1, banner2, tied}
  },
});
