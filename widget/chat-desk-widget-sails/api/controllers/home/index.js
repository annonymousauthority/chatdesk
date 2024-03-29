module.exports = {
  friendlyName: 'Home',

  description: 'Home index.',

  inputs: {
    agentKey: {
      description: 'The Agent Key',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function ({ agentKey }) {
    return {
      page: 'index',
      props: {
        agentKey,
      },
    }
  },
}
