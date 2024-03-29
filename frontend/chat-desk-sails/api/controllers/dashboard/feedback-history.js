module.exports = {
  friendlyName: 'FeedbackHistory',

  description: 'Dashboard Feedback history',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return {
      page: 'dashboard/feedbackhistory',
    }
  },
}
