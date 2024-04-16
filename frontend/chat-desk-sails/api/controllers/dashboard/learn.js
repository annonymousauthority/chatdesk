module.exports = {
  friendlyName: 'learn',

  description: 'App Learning',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'dashboard/learn',
    }
  },
}
