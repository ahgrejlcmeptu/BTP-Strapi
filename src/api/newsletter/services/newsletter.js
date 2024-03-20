'use strict';
/**
 * newsletter service
 */

const {createCoreService} = require('@strapi/strapi').factories;
const users = [
  {id: '1', lastOrder: '2024,03,10'},
  {id: '2', lastOrder: '2024,03,14'}
]
const ONE_DAY = 1000 * 60 * 24
const newsletter = {}
const newsletterStop = (id) => {
  clearTimeout(newsletter[id])
  clearInterval(newsletter[id])
}

const types = {
  test: {
    init({table, logics, id}) {
      newsletterStop(id)
      console.log('отправляем на ' + logics.list)
    }
  },
  presently: {
    init({table, logics, id}) {
      newsletterStop(id)
      console.log('отправляем сейчас')
    }
  },
  certainTime: {
    init({table, logics, id}) {
      newsletterStop(id)
      console.log('отправляем в ' + logics.date + ' ' + logics.time)
    }
  },
  birthday: {
    init({table, logics, id}) {
      newsletterStop(id)
      console.log('отправляем именинникам')
    }
  },
  lastOrder: {
    init({table, logics, id}) {
      newsletterStop(id)
      func()

      newsletter[id] = setInterval(() => {
        func()
      }, ONE_DAY)
      console.log('отправляем через ' + logics.day + ' с последнего заказа')

      function func() {
        users.forEach(user => {
          const date = new Date()
          date.setHours(0, 0, 0, 0)

          const oldDate = new Date(user.lastOrder)
          oldDate.setDate(oldDate.getDate() + +logics.day)
          oldDate.setHours(0, 0, 0, 0)

          if (+oldDate === +date) {
            console.log('отправляем ' + user.id)
          }
        })
      }
    }
  }
}

module.exports = createCoreService('api::newsletter.newsletter', {
  async find(ctx) {
    const data = await strapi.query('api::newsletter.newsletter').findMany()

    return data.map(item => {
      delete item.data
      return item
    })
  },
  async findOne(ctx) {
    const data = await strapi.entityService.findOne('api::newsletter.newsletter', ctx.params.id,);
    return data
  },
  async action(ctx) {
    const data = await strapi.entityService.update('api::newsletter.newsletter', ctx.params.id, {
      data: ctx.request.body
    });

    const body = ctx.request.body

    types[body.action.name].init({
      table: body.data.table,
      logics: body.action.logics,
      id: ctx.params.id
    })

    return data
  },
});
