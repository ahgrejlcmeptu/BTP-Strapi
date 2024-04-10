'use strict';
const nodemailer = require("nodemailer");
const fs = require("fs");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, port: process.env.SMTP_PORT, secure: true,  // 465 true all false
  auth: {
    user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD,
  },
});

const ONE_DAY = 1000 * 60 * 24
const newsletter = {}

const newsletterStop = (id) => {
  clearTimeout(newsletter[id])
  clearInterval(newsletter[id])
}
const mailSend = async ({table, mail, name}) => {
  await transporter.sendMail({
    from: `"Title text" <${process.env.DEFAULT_EMAIL}>`, to: mail, subject: name, html: table.table
  });
  console.log({name, mail})
}
const userNewsletter = (users) => {
  let str = ''
  users.forEach(i => {
    if (i.newsletter) str = str + i.mail + ', '
  })
  return str
}
const userBirthday = (users) => {
  let str = ''
  users.forEach(i => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)

    const birthdayDate = new Date(i.birthday)
    birthdayDate.setHours(0, 0, 0, 0)
    birthdayDate.setFullYear(date.getFullYear())

    if (i.newsletter && +birthdayDate === +date) str = str + i.mail + ', '
  })
  return str
}
const userLastOrder = (users, day) => {
  let str = ''
  users.forEach(i => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)

    const oldDate = new Date(i.lastOrder)
    oldDate.setDate(oldDate.getDate() + +day)
    oldDate.setHours(0, 0, 0, 0)

    if (+oldDate === +date) str = str + i.mail + ', '
  })
  return str
}

/**
 * newsletter service
 */

const {createCoreService} = require('@strapi/strapi').factories;

const types = {
  test: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)

      await mailSend({table, mail: logics.list, name})
      console.log('отправляем тестовый на ' + logics.list)
    }
  }, presently: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)

      const mail = userNewsletter(users)

      await mailSend({table, mail, name})
      console.log('отправляем сейчас на' + mail)
    }
  }, certainTime: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)
      console.log('отправляем в ' + logics.date + ' ' + logics.time)

      const dateArr = logics.date.split('.')
      const timeArr = logics.time.split(':')

      const date = new Date()
      const dateSend = new Date(dateArr[2], +dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1])
      date.setSeconds(0, 0)
      const timeOut = +dateSend - +date

      if (timeOut < 0) return;

      newsletter[id] = setTimeout(async () => {
        const mail = userNewsletter(users)

        await mailSend({table, mail, name})

        console.log(`Время пришло!!! ${logics.date} ${logics.time}`)
      }, timeOut)
    }
  }, birthday: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)
      const mail = userBirthday(users)
      await mailSend({table, mail, name})

      newsletter[id] = setInterval(async () => {
        const mail = userBirthday(users)
        await mailSend({table, mail, name})
      }, ONE_DAY)
    }
  }, lastOrder: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)
      const mail = userLastOrder(users, logics.day)
      await mailSend({table, mail, name})

      newsletter[id] = setInterval(async () => {
        const mail = userLastOrder(users, logics.day)
        await mailSend({table, mail, name})
      }, ONE_DAY)
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
    const data = await strapi.entityService.findOne('api::newsletter.newsletter', ctx.params.id);
    return data
  },
  async action(ctx) {
    console.log('пробуем отправить')
    const data = await strapi.entityService.update('api::newsletter.newsletter', ctx.params.id, {
      data: ctx.request.body
    });

    const body = ctx.request.body

    const users = [{
      newsletter: true,
      id: '1',
      lastOrder: '2024,03,10',
      mail: 'bgblllhuk@gmail.com',
      birthday: '1991.03.21'
    }, {newsletter: true, id: '2', lastOrder: '2024,03,14', mail: 'vikttkachyov@yandex.ru', birthday: '1991.03.22'}]

    await types[body.action.name].init({
      users, name: body.name, table: body.data, logics: body.action.logics, id: ctx.params.id
    })

    return data
  },
  async create(ctx) {
    const entry = ctx.request.body

    const data = await strapi.entityService.create('api::newsletter.newsletter', {data: entry.body});
    return {data}
  },
  async update(ctx) {
    const entry = ctx.request.body

    const data = await strapi.entityService.update('api::newsletter.newsletter', ctx.params.id, {data: entry.body});
    return data
  },
});
