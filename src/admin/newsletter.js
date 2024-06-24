const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, port: process.env.SMTP_PORT, secure: true,  // 465 true all false
  auth: {
    user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD,
  },
});
const ONE_DAY = 1000 * 60 * 24
const newsletter = {}
const TEST_USERS = [
  {
    newsletter: true,
    id: '1',
    lastOrder: '10.03.2024',
    mail: 'bgblllhuk@gmail.com',
    birthday: '24.06.1991',
    region: '1',
    tariff: '1',
    service: '1',
    subscribers: 'Физ',
    activities: 'yes'
  },
  {
    newsletter: true,
    id: '2',
    lastOrder: '10.03.2024',
    mail: 'bgblllhuk@gmail.com',
    birthday: '21.03.1991',
    region: '1',
    tariff: '1',
    service: '1',
    subscribers: 'Физ',
    activities: 'no'
  },
  {
    newsletter: true,
    id: '3',
    lastOrder: '10.03.2024',
    mail: 'bgblllhuk@gmail.com',
    birthday: '21.03.1991',
    region: '1',
    tariff: '1',
    service: '2',
    subscribers: 'Юр',
    activities: 'yes'
  },
]
const loadUsers = async () => {
  return TEST_USERS
}

const newsletterStop = (id) => {
  clearTimeout(newsletter[id])
  clearInterval(newsletter[id])
}
const mailSend = async ({table, mail, user, name, description}) => {
  const html = table.table.replace('/mail/delete', `http://localhost:5173/mail/delete/${user?.id}`);
  if (user) {
    await transporter.sendMail({
      from: `"${name}" <${process.env.DEFAULT_EMAIL}>`,
      to: user.mail,
      subject: description,
      html: html
    });
    return
  }
  await transporter.sendMail({
    from: `"${name}" <${process.env.DEFAULT_EMAIL}>`,
    to: mail,
    subject: description,
    html: html
  });
}

const types = {
  test: {
    async init({name, description, table, logics, id}) {
      newsletterStop(id)

      await mailSend({table, mail: ['bgblllhuk@gmail.com'], name, description})
      console.log('отправляем тестовый на ' + logics.list)
    }
  },
  base: {
    async init({name, description, table, logics, id}) {
      newsletterStop(id)
      logicsDate[logics.date].init({name, description, table, logics, id})
    }
  },
}
const logicsDate = {
  one: {
    async init({name, description, table, logics, id}) {
      newsletterStop(id)
      console.log('Отправка в дату! отправляем в ' + logics.details.date + ' ' + logics.details.time)

      const dateArr = logics.details.date.split('.')
      const timeArr = logics.details.time.split(':')

      const date = new Date()
      const dateSend = new Date(dateArr[2], +dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1])
      date.setSeconds(0, 0)
      let timeOut = +dateSend - +date


      if (timeOut < 0) return;

      newsletter[id] = setTimeout(async () => {
        let users = await loadUsers()
        users = filterUsers(users, logics)

        users.forEach((user) => {
          mailSend({table, user, name, description})
        })

        console.log(`Время пришло!!!`)
      }, timeOut)
    }
  },
  periodic: {
    async init({name, description, table, logics, id}) {
      newsletterStop(id)
      console.log('Отправка по периоду! отправляем в ' + logics.details.date + ' ' + logics.details.time)

      const dateArr = logics.details.begin.split('.')
      const timeArr = logics.details.time.split(':')

      const date = new Date()
      const dateSend = new Date(dateArr[2], +dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1])
      date.setSeconds(0, 0)

      const dayValue = (dateSend.getDay() || 7) - logics.details.day
      dateSend.setDate(dateSend.getDate() - (dayValue > 0 ? dayValue - 7 : dayValue))
      let timeOut = +dateSend - +date
      if (timeOut < 0) {
        dateSend.setDate(dateSend.getDate() + 7);
        timeOut = +dateSend - +date
      }

      timeOut = 10000

      newsletter[id] = setTimeout(async function tick() {
        let users = await loadUsers()
        users = filterUsers(users, logics)

        users.forEach((user) => {
          mailSend({table, user, name, description})
        })

        console.log(`Отправка по периоду! Время пришло!!!`)
        const timeOut = new Date()

        if (logics.periodic === '0') timeOut.setDate(timeOut.getDate() + 7)
        if (logics.periodic === '1') timeOut.setMonth(timeOut.getMonth() + 1)
        if (logics.periodic === '2') timeOut.setFullYear(timeOut.getFullYear() + 1)
        // timeOut - new Date()
        newsletter[id] = setTimeout(tick, 20000);
      }, timeOut)
    }
  },
  sample: {
    async init({name, description, table, logics, id}) {
      newsletterStop(id)

      if (logics.details.birthdays) {

        let users = await loadUsers()
        users = userBirthday(filterUsers(users, logics))

        users.forEach((user) => {
          mailSend({table, user, name, description})
        })

        newsletter[id] = setInterval(async () => {
          let users = await loadUsers()
          users = userBirthday(filterUsers(users, logics))

          users.forEach((user) => {
            mailSend({table, user, name, description})
          })
        }, ONE_DAY)
      }

      if (logics.details.news) {

      }
      if (logics.details.stock) {

      }
    }
  },
}

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
const userBirthday = (users) => {
  return users.filter(i => {
    if (!i.birthday) return;

    const date = new Date()
    date.setHours(0, 0, 0, 0)

    const dateArr = i.birthday.split('.')

    const birthdayDate = new Date(dateArr[2], +dateArr[1] - 1, dateArr[0], 0, 0, 0, 0)
    birthdayDate.setFullYear(date.getFullYear())
    if (+birthdayDate === +date) return true;
  })
}

module.exports = {
  newsletterStart: (list) => {
    list.forEach(async (item) => {
      await types[item.action.type].init({
        name: item.name,
        table: item.table,
        logics: item.action,
        id: item.id
      })
    })

  },
  newsletterSend: (body, id) => {
    types[body.action.type].init({
      name: body.name,
      description: body.description,
      table: body.data,
      logics: body.action,
      id
    })
  },
  newsletterStop: id => newsletterStop(id),
  async getUsers(body) {
    let users = await loadUsers()
    users = filterUsers(users, body)
    if (body.details.birthdays) users = userBirthday(users)
    return users.length
  }
}

