'use strict';

const {renderBlock} = require("blocks-html-renderer");
/**
 * service-page service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service-page.service-page', {
  async find(ctx) {
    const data = await strapi.query('api::service-page.service-page').findOne({
      populate: ['banner.button', 'banner.img', 'banner.img.img', "banner.fon"],
    });

    let {banner} = data

    banner = banner.map(item => {
      const {id, title, text, form, button} = item
      const fon = item.fon.url
      const img = item.img.map(i => ({size: i.size, img: i.img.url}))

      return {id, title, text, form, img, fon, button}
    })

    return {banner}


    const button = banner.button

    const img = banner.img.map(i => ({size: i.size, img: i.img.url}))

    const EditBanner = {title: banner.title, text: banner.text, button, fon: banner.fon.url, img}

    return {banner: EditBanner}
  },
});
