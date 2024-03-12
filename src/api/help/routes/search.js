module.exports = {
  routes: [
    {
      method: "GET",
      path: "/search",
      handler: "search.search",
    },
    {
      method: "GET",
      path: "/searchTips",
      handler: "search.searchTips",
    },
  ],
};
