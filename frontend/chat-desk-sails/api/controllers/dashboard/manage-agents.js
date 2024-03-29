module.exports = {
  friendlyName: 'ManageAgents',

  description: 'Dashboard Manage Agents',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'dashboard/manageagents',
    }
  },
}
