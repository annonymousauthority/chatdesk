module.exports = {
  friendlyName: 'Usage Metrics',

  description: 'Dashboard Usage Metrics',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'dashboard/metrics',
    }
  },
}
