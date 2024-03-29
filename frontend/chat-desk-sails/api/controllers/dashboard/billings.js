module.exports = {
  friendlyName: 'billings',

  description: 'App Billings',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'dashboard/billings',
    }
  },
}
