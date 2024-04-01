module.exports = {
  friendlyName: 'SetupWidget',

  description: 'Setup Chat Widget',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'dashboard/setupwidget',
    }
  },
}
