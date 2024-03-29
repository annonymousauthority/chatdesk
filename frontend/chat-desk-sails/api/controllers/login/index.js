module.exports = {
  friendlyName: 'Login',

  description: 'User Login Page',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'login',
    }
  },
}
