/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/
  'GET /': 'home/index',
  'GET /login': 'login/index',
  'GET /signup': 'signup/index',
  'GET /features': 'features/index',
  'GET /pricing': 'pricing/index',
  'GET /dashboard/chat-history': 'dashboard/chat-history',
  'GET /dashboard/feedback-history': 'dashboard/feedback-history',
  'GET /dashboard/manage-agents': 'dashboard/manage-agents',
  'GET /dashboard/metrics': 'dashboard/metrics',
  'GET /dashboard/billings': 'dashboard/billings',
  'GET /dashboard/setup-widget': 'dashboard/setup-widget',
  'GET /dashboard/learn': 'dashboard/learn',
}
