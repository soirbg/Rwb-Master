let homeController = require('./home-controller')
let usersController = require('./users-controller')
let articlesController = require('./articles-controller')
let profileController = require('./profile-controller')
let eventController = require('./event-controller')

module.exports = {
  home: homeController,
  users: usersController,
  articles: articlesController,
  profile: profileController,
  event: eventController
}
