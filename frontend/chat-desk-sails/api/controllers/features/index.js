module.exports = {
  friendlyName: 'features',

  description: 'Features index.',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'features',
    }
  },
}
