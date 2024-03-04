'use strict';

const {renderBlock} = require("blocks-html-renderer");
/**
 * help service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help.help', {
  async findOne(ctx) {
    const data = await strapi.entityService.findOne('api::help.help', ctx.params.id, {
      populate: [
        'category', 'reviews', 'card',
        'page.banner.banner.button', 'page.banner.banner.img', 'page.banner.banner.img.img', "page.banner.banner.fon",

        'page.slide.img', 'page.slide.video', 'page.slide.poster',
        'page.table.table.tr'
      ]
    });

    const page = data.page.map(item => {
      const component = item.__component
      switch (component) {
        case 'help.one':
          const banner = item.banner?.banner.map(item => {
            const {id, title, text, form, button} = item
            const fon = item.fon.url
            const img = item.img.map(i => ({size: i.size, img: i.img.url}))

            return {id, title, text, form, img, fon, button}
          })

          return {
            component: 'one',
            title: item.title,
            description: renderBlock(item.description),
            banner
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
        case 'help.table':
          const table = item.table?.table.map(item => {
            const tr = item.tr.map(i => ({id: i.id, text: renderBlock(i.td)}))
            return {
              ...item, tr
            }
          })

          return {
            component: 'table',
            table
          }
          break
      }
    })
    const reviews = data.reviews
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
      category: category.title,
      title: data.card.title,
      page,
      reviews,
      question: questionGroup
    }
  },
  async search(ctx) {
    const data = await strapi.query('api::help.help').findMany({
      populate: [
        'category', 'reviews', 'card',
        'page.banner.banner.button', 'page.banner.banner.img', 'page.banner.banner.img.img', "page.banner.banner.fon",

        'page.slide.img', 'page.slide.video', 'page.slide.poster',
        'page.table.table.tr'
      ]
    });

    let result = data.filter(item => {
      const str = JSON.stringify(item)
      if (str.indexOf(ctx.query.result) > -1) return item
    })

    result = result.map(item => {
      return {
        id: item.id,
        title: item.card.title,
        description: renderBlock(item.card.description)
      }
    })

    return result
  },
});
