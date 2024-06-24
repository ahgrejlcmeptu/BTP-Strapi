'use strict';

const {newsletterStart} = require("./admin/newsletter");

module.exports = {
  register({strapi}) {},
  async bootstrap({ strapi }) {
    const data = await strapi.query('api::newsletter.newsletter').findMany({
      filters: { active: true }
    })

    const dataFilter = data.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        action: item.action,
        table: item.data
      }
    })
    newsletterStart(dataFilter)
  }
};

