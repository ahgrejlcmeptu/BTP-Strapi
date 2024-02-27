'use strict';

/**
 * bumph router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::bumph.bumph');
