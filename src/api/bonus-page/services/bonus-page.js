'use strict';
// const strapiRichTextToHtml = require('strapi-plugin-rich-text-to-html');
// const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');
const {renderBlock} = require('blocks-html-renderer')
/**
 * bonus-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bonus-page.bonus-page', {
  async find(ctx) {
    const data = await strapi.query('api::bonus-page.bonus-page').findOne({
      populate: ['banner', 'banner.button', 'banner.img', 'banner.img.img', "banner.fon"],
    });

    const {id, title, description, banner} = data
    const button = banner.button
    delete button.id

    const img = banner.img.map(i => ({size: i.size, img: i.img.formats.thumbnail.url}))

    const EditBanner = {title: banner.title, text: banner.text, button, fon: banner.fon.url, img}

    return {id, title, description: renderBlock(data.description), banner: EditBanner}
  },
});
