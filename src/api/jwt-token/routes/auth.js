module.exports = {
  routes: [
    {
      method: "POST",
      path: "/login",
      handler: "auth.login",
    },
    {
      method: "POST",
      path: "/logout",
      handler: "auth.logout",
    },
  ],
};
