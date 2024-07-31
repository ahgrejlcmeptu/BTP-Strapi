'use strict';

/**
 * jwt-token service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::jwt-token.jwt-token', {
    async login(ctx) {
        let response = await fetch('https://docs.bteleport.ru/api/lk/auth', {
          method: 'POST',
          body: JSON.stringify({
            "login": "lolo1",
            "password": "12345"
          })
        });

        let result = await response.json();

        return result
    },
    async logout(ctx) {
        return 'logout'
    },
});
