module.exports = {
  friendlyName: 'Chathistory',

  description: 'Dashboard Chat history',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'dashboard/chathistory',
    }
  },
}
