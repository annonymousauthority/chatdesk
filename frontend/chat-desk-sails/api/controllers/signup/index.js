module.exports = {
  friendlyName: 'Sigup',

  description: 'User Signup Route',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'signup',
    }
  },
}
