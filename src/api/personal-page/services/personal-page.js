'use strict';

/**
 * personal-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::personal-page.personal-page',{
  async find(ctx) {
    const data = await strapi.query('api::personal-page.personal-page').findOne({
      populate: [
        'bannerTop', 'bannerTop.banner', 'bannerTop.banner.button', 'bannerTop.banner.img', 'bannerTop.banner.img.img', "bannerTop.banner.fon",
        'bannerBottom', 'bannerBottom.banner', 'bannerBottom.banner.button', 'bannerBottom.banner.img', 'bannerBottom.banner.img.img', "bannerBottom.banner.fon",
        'bannerTied', 'bannerTied.banner', 'bannerTied.banner.button', 'bannerTied.banner.img', 'bannerTied.banner.img.img', "bannerTied.banner.fon",
      ]
    });
    if (!data.publishedAt) return {}

    const banners = {bannerTop: data.bannerTop?.banner, bannerBottom: data.bannerBottom?.banner, bannerTied: data.bannerTied?.banner}
    const bannersFormat = {}

    Object.keys(banners).forEach(key => {
      if (!banners[key]) return;

      bannersFormat[key] = banners[key].map(item => {
        const {id, title, text, form, button} = item
        const fon = item.fon.url
        const img = item.img.map(i => ({size: i.size, img: i.img.url}))

        return {id, title, text, form, img, fon, button}
      })
    })

    return {...bannersFormat}
  },
});
