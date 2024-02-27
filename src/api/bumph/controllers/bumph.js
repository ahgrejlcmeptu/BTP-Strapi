'use strict';

/**
 * bumph controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bumph.bumph', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::bumph.bumph').find(ctx)
  },
}));
