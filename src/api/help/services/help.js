'use strict';

const {renderBlock} = require("blocks-html-renderer");
/**
 * help service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help.help', {
  async findOne(ctx) {
    const data = await strapi.query('api::help.help').findOne({
      // populate: ['banner', 'banner.img', 'banner.button', 'reviews', 'column', 'column.tr', 'page']
      populate: ['page', 'page.slide.img', 'page.slide.video', 'page.slide.poster']
    });

    return {page: data.page}

    // const {id, title, description, banner} = data
    // const button = banner.button
    //
    // const img = banner.img.map(i => ({size: i.size, img: i.img.url}))
    //
    // const EditBanner = {title: banner.title, text: banner.text, button, fon: banner.fon.url, img}
    //
    // return {id, title, description: renderBlock(data.description), banner: EditBanner}
  },
});
