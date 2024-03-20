'use strict';
/**
 * newsletter service
 */

const {createCoreService} = require('@strapi/strapi').factories;

const newsletter = {}
const newsletterStop = (id) => {
  console.log(newsletter)
  clearTimeout(newsletter[id])
  clearInterval(newsletter[id])
}

const types = {
  test: {
    init(data, id) {
      newsletterStop(id)
      console.log('отправляем на ' + data.list)
    }
  },
  presently: {
    init(data, id) {
      newsletterStop(id)
      console.log('отправляем сейчас')
    }
  },
  certainTime: {
    init(data, id) {
      newsletterStop(id)
      console.log('отправляем в ' + data.date + ' ' + data.time)
    }
  },
  birthday: {
    init(data, id) {
      newsletterStop(id)
      console.log('отправляем именинникам')
    }
  },
  lastOrder: {
    init(data, id) {
      newsletterStop(id)
      const userList = [{date: '2024,03,10'}, {date: '2024,03,14'}]
      userList.forEach(user => {
        const date = new Date()
        date.setHours(0,0,0,0)

        const oldDate = new Date(user.date)
        oldDate.setDate(oldDate.getDate() + +data.day)
        oldDate.setHours(0,0,0,0)

        if (+oldDate === +date) {
          console.log('отправляем')
        }
      })

      newsletter[id] = setInterval(() => {
        userList.forEach(user => {
          const date = new Date()
          date.setHours(0,0,0,0)

          const oldDate = new Date(user.date)
          oldDate.setDate(oldDate.getDate() + +data.day)
          oldDate.setHours(0,0,0,0)

          if (+oldDate === +date) {
            console.log('отправляем')
          }
        })
      }, 1000 * 60 * 24)
      console.log('отправляем через ' + data.day + ' с последнего заказа')
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

    const action = ctx.request.body.action
    types[action.name].init(action.logics, ctx.params.id)

    return data
  },
});
