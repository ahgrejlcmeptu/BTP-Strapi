'use strict';

/**
 * jwt-token router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::jwt-token.jwt-token');
