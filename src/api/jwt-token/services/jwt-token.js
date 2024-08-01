'use strict';

/**
 * jwt-token service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::jwt-token.jwt-token', {
    async login(ctx) {
        console.log(666);
        const response = await fetch('https://lk.bteleport.ru/lk/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                login: "lolo1",
                password: "12345"                
            })
        })
        const data = await response.json()

        return data

        // let response = await fetch('https://docs.bteleport.ru/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json;charset=utf-8'
        //   },
        //   body: JSON.stringify({
        //     "login": "lolo1",
        //     "password": "12345"
        //   })
        // });
        // console.log(555);

        // let result = await response.json();

        // console.log(result);

        // return result
    },
    async logout(ctx) {
        return 'logout'
    },
});
