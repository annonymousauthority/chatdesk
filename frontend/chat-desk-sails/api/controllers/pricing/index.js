module.exports = {
  friendlyName: 'pricing',

  description: 'Pricing index.',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'pricing',
    }
  },
}
