const controllers = require('../controllers')
const auth = require('../config/auth')
const multer  = require('multer')
const crypto = require('crypto')
const mime = require('mime')

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/')
	},
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype))
		})
	}
})
			
let upload = multer({ storage: storage })
module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)
// auth.isInRole('Admin')
  app.get('/articles/list', controllers.articles.list)
  app.get('/articles/createArticle', auth.isAuthenticated, controllers.articles.createArticle)
  app.post('/articles/create', controllers.articles.create)
  app.get('/profile', auth.isAuthenticated, controllers.profile.profile)
  app.get('/information/:id', controllers.articles.info)
  app.get('/eventCreate', controllers.event.createEvent)
  app.post('/sendEvent', upload.single('picture'), controllers.event.sendEvent)
  app.get('/listEvents', controllers.event.listEvent)
  app.get('/listEvents/edit/:id', controllers.event.infoEvent)
  app.post('/listEvents/:id',upload.single('picture'), controllers.event.updateEvent)
  app.get('/listEvents/delete/:id', controllers.event.deleteEvent)
  app.get('/eventInfo/:id', controllers.event.eventInfoMobile)
  app.get('/listAllEvents', controllers.event.eventListMobile)
  
  //app.all('*', (req, res) => {
    //res.status(404)
    //res.send('Not Found')
    //res.end()
  //})
}
