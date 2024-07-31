'use strict';

/**
 * jwt-token controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::jwt-token.jwt-token');
