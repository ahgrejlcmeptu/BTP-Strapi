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
      id: data.id,
      category: category.title,
      title: data.card.title,
      page,
      reviews,
      question: questionGroup
    }
  },
  async update(ctx) {
    const reviews = await strapi.entityService.findOne('api::help.help', ctx.params.id, {
      populate: ['reviews']
    });
    reviews.reviews[ctx.request.body.reviews]++

    const data = await strapi.entityService.update('api::help.help', ctx.params.id, {
      data: {reviews: reviews.reviews}
    });
    return data
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
  async searchTips(ctx) {
    const results = await strapi.query('api::help.help').findMany({
      populate: [
        'category', 'card',
        'page.banner.banner',
        'page.table.table.tr'
      ]
    });

    let test = []

    results.forEach(data => {
      const page = data.page.map(item => {
        const component = item.__component
        switch (component) {
          case 'help.one':
            const banner = item.banner?.banner.map(item => {
              const {title, text} = item

              return {title, text}
            })

            return {
              title: item.title,
              description: renderBlock(item.description),
              banner
            }
            break
          case 'help.two':
            return {
              title: item.title,
              description: renderBlock(item.description)
            }
            break
          case 'help.slide':
            return {
              title: item.title,
              description: renderBlock(item.description),
            }
            break
          case 'help.plate':
            return {
              title: item.title,
              description: renderBlock(item.description)
            }
            break
          case 'help.plate-column':
            return {
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
              table
            }
            break
        }
      })
      const newData = {
        title: data.card.title,
        description: renderBlock(data.card.description),
        page,
      }
      const arr = []

      for (let key in newData) {
        if (newData[key] && typeof newData[key] === 'string') arr.push(newData[key].replace(/(<([^>]+)>)/gi, ''))
        if (newData[key] && typeof newData[key] === 'object') {
          for (let i in newData[key][0]) {
            const obj = newData[key][0]
            if (obj[i] && typeof obj[i] === 'string') arr.push(obj[i].replace(/(<([^>]+)>)/gi, ''))
          }
        }
      }

      arr.find(item => {
        let index = item.toUpperCase().indexOf(ctx.query.result.toUpperCase())

        if (index > -1) {
          test.push({
            id: data.id,
            category: data.category.id,
            text: wordWhole(item, index, ctx.query.result.length)
          })
          return true
        }

      });
    })

    return test
  },
});

function wordWhole (str, index, last) {
  let firstIndex, lastIndex

  for (firstIndex = index; firstIndex > 0;  firstIndex--) {
    if (str[firstIndex] === ' ') {
      firstIndex++
      break;
    }
  }
  for (lastIndex = index + last; lastIndex < str.length;  lastIndex++) {
    if (str[lastIndex] === ' ') break;
  }

  return str.slice(firstIndex, lastIndex)
}
