'use strict';
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, port: process.env.SMTP_PORT, secure: true,  // 465 true all false
  auth: {
    user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD,
  },
});

const TEST_USERS = [
  {
    newsletter: true,
    id: '1',
    lastOrder: '10.03.2024',
    mail: 'bgblllhuk@gmail.com',
    birthday: '20.06.1991',
    region: '1',
    tariff: '1',
    service: '1',
    subscribers: 'Физ',
    activities: 'yes'
  },
  // {
  //   newsletter: true,
  //   id: '2',
  //   lastOrder: '10.03.2024',
  //   mail: 'bgblllhuk@gmail.com',
  //   birthday: '21.03.1991',
  //   region: '1',
  //   tariff: '1',
  //   service: '1',
  //   subscribers: 'Физ',
  //   activities: 'no'
  // },
  // {
  //   newsletter: true,
  //   id: '3',
  //   lastOrder: '10.03.2024',
  //   mail: 'bgblllhuk@gmail.com',
  //   birthday: '21.03.1991',
  //   region: '1',
  //   tariff: '1',
  //   service: '2',
  //   subscribers: 'Юр',
  //   activities: 'yes'
  // },
]
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
    if (!i.birthday) return;

    const date = new Date()
    date.setHours(0, 0, 0, 0)

    const dateArr = i.birthday.split('.')

    const birthdayDate = new Date(dateArr[2], +dateArr[1] - 1, dateArr[0], 0, 0, 0, 0)
    birthdayDate.setFullYear(date.getFullYear())
    if (+birthdayDate === +date) str = str + i.mail + ', '
  })
  return str
}

/**
 * newsletter service
 */

const {createCoreService} = require('@strapi/strapi').factories;

const filterUsers = (users, logics) => {
  const filterLogics = {
    "region": logics.region,
    "tariff": logics.tariff,
    "service": logics.service,
    "activities": logics.activities,
    "subscribers": logics.subscribers
  }
  return users.filter(item => {
    for (let key in filterLogics) {
      if (Array.isArray(logics[key])) {
        if (logics[key].length && !logics[key].includes(item[key])) {
          return false;
        }
      } else {
        if (key === 'service' && logics.serviceOn.length) {
          if (logics[key] && logics.serviceOn.length !== 2) {
            if (logics.serviceOn[0] === 'on' && item[key] !== logics[key]) {
              return false;
            }
            if (logics.serviceOn[0] === 'off' && item[key] === logics[key]) {
              return false;
            }
          }
        } else {
          if (logics[key] && item[key] !== logics[key]) {
            return false;
          }
        }
      }

    }
    return true;
  })
}

const types = {
  test: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)

      await mailSend({table, mail: ['bgblllhuk@gmail.com'], name})
      console.log('отправляем тестовый на ' + logics.list)
    }
  },
  base: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)
      const usersList = filterUsers(users, logics)
      const details = logics.details

      logicsDate[logics.date].init({users: usersList, name, table, logics: details, id})
    }
  },
}
const logicsDate = {
  one: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)
      console.log('Отправка в дату! отправляем в ' + logics.date + ' ' + logics.time)

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
  },
  periodic: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)
      console.log('Отправка по периоду! отправляем в ' + logics.date + ' ' + logics.time)

      const dateArr = logics.begin.split('.')
      const timeArr = logics.time.split(':')

      const date = new Date()
      const dateSend = new Date(dateArr[2], +dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1])
      date.setSeconds(0, 0)

      const dayValue = (dateSend.getDay() || 7) - logics.day
      dateSend.setDate(dateSend.getDate() - (dayValue > 0 ? dayValue - 7 : dayValue))
      let timeOut = +dateSend - +date
      if (timeOut < 0) {
        dateSend.setDate(dateSend.getDate() + 7);
        timeOut = +dateSend - +date
      }

      newsletter[id] = setTimeout(async function tick() {
        const mail = userNewsletter(users)

        await mailSend({table, mail, name})

        console.log(`Отправка по периоду! Время пришло!!! ${logics.date} ${logics.time}`)
        const timeOut = new Date()

        if (logics.periodic === '0') timeOut.setDate(timeOut.getDate() + 7)
        if (logics.periodic === '1') timeOut.setMonth(timeOut.getMonth() + 1)
        if (logics.periodic === '2') timeOut.setFullYear(timeOut.getFullYear() + 1)

        newsletter[id] = setTimeout(tick, timeOut - new Date());
      }, timeOut)
    }
  },
  sample: {
    async init({users, name, table, logics, id}) {
      newsletterStop(id)

      if (logics.birthdays) {
        const mail = userBirthday(users)
        await mailSend({table, mail, name})

        newsletter[id] = setInterval(async () => {
          const mail = userBirthday(users)
          await mailSend({table, mail, name})
        }, ONE_DAY)
      }

      if (logics.news) {

      }
      if (logics.stock) {

      }
    }
  },
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
  async action(ctx) {
    console.log('пробуем отправить')
    const data = await strapi.entityService.update('api::newsletter.newsletter', ctx.params.id, {
      data: ctx.request.body
    });

    const body = ctx.request.body

    await types[body.action.type].init({
      users: TEST_USERS,
      name: body.name,
      table: body.data,
      logics: body.action,
      id: ctx.params.id
    })

    return data
  },
});
