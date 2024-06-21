'use strict';

const sendNewsletter = (list) => {
  console.log(list)
}

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({strapi}) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const data = await strapi.query('api::newsletter.newsletter').findMany({
      active: true
    })
    const dataFilter = data.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        action: item.action,
        table: item.data.table
      }
    })
    sendNewsletter(dataFilter)
  },
};

