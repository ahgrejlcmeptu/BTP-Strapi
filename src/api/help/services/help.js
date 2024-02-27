'use strict';

const {renderBlock} = require("blocks-html-renderer");
/**
 * help service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help.help', {
  async findOne(ctx) {
    const data = await strapi.entityService.findOne('api::help.help', ctx.params.id, {
      populate: ['page.slide.img', 'page.slide.video', 'page.slide.poster', 'banner',
        'banner.button', 'banner.img', 'banner.img.img', "banner.fon",
        'reviews', 'table.tr', 'category'
      ]
    });

    const page = data.page.map(item => {
      const component = item.__component
      switch (component) {
        case 'help.one':
          return {
            component: 'one',
            title: item.title,
            description: renderBlock(item.description)
          }
          break
        case 'help.two':
          return {
            component: 'two',
            title: item.title,
            description: renderBlock(item.description)
          }
          break
        case 'help.slide':
          return {
            component: 'slide',
            title: item.title,
            description: renderBlock(item.description),
            slide: item.slide.map(i => ({...i, img: i.img?.url, poster: i.poster?.url, video: i.video?.url}))
          }
          break
        case 'help.plate':
          return {
            component: 'plate',
            title: item.title,
            description: renderBlock(item.description)
          }
          break
        case 'help.plate-column':
          return {
            component: 'plate-column',
            title: item.title,
            description: renderBlock(item.description)
          }
          break
      }
    })
    const banner = data.banner.map(item => {
      const {id, title, text, form, button} = item
      const fon = item.fon.url
      const img = item.img.map(i => ({size: i.size, img: i.img.url}))

      return {id, title, text, form, img, fon, button}
    })
    const reviews = data.reviews
    const table = data.table.map(item => {
      const tr = item.tr.map(i => ({id: i.id, text: renderBlock(i.td)}))
      return {
        ...item, tr
      }
    })

    const category = data.category

    const question = await strapi.query('api::question.question').findMany({
      where: {
        category: {
          title: category.title
        }
      },
      populate: true
    });

    const questionGroup = question.map(item => ({
      id: item.id,
      title: item.title,
      description: renderBlock(item.description),
      persons: item.persons,
      category: item.category.title
    }))

    return {
      ...data,
      description: renderBlock(data.description),
      category: category.title,
      page,
      banner,
      reviews,
      table,
      question: questionGroup
    }
  },
});
