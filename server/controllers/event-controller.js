let Event = require('mongoose').model('Event')

module.exports = {
	createEvent:(req, res) => {
		res.render('events/eventForm')
	},
	sendEvent: (req, res, next) =>{
			let pic = ' '
			
			if (req.file && req.file.path) {
				pic = req.file.path
			} else {
				pic = 'no image'
			}
			
			let event = new Event({
				time: req.body.time,
				eventName: req.body.eventName,
				speaker: req.body.speaker,
				overview: req.body.overview,
				aboutCompany: req.body.aboutCompany,
				hall: req.body.hall,
				picture: pic
			})
			
			event.save(function (err) {
			  if (err)
				console.log(err)
			  else
					console.log('success')
			})
			
			if (req.file)
				console.log('file uploaded')
			else // no file uploaded
				console.log('no file uploaded')
			
			
		res.redirect('listEvents')
	},
	listEvent: (req, res, next) => {
		Event.find().exec((err, data) =>{
			if(err){
				return next(err)
			}
			res.render('events/eventsList',{data: data})
		})
	},
	infoEvent: (req, res, next) => {
        Event.findById(req.params.id, function(err, data){
			if(err) {
                return next(err)
            }
            res.render('events/eventEdit',{data: data})
        })
	},
	updateEvent: (req, res, next) => {
		
		    
			
		Event.findById(req.params.id, function(err, data){
			 if (err) return handleError(err)
			
			let pic = ' '
			
			if (req.file && req.file.path) {
				pic = req.file.path
			} else if( data.picture != 'no image'){
				pic = data.picture
			}else {
				pic = 'no image'
			}
			
			data.time = req.body.time
			data.eventName = req.body.eventName
			data.speaker = req.body.speaker
			data.overview = req.body.overview
			data.aboutCompany = req.body.aboutCompany
			data.hall = req.body.hall
			data.picture = pic
			
			data.save(function(err, data){
				console.log(data)
				 if (err) return handleError(err)
				res.redirect('/listEvents')
			})
			
			
		})
		
	},
	deleteEvent: (req, res, next) => {
		Event.findByIdAndRemove(req.params.id, function(err,data){
			if (err) return handleError(err)
			res.redirect('/listEvents')
		})
	},
	eventListMobile: (req, res, next) => {
		Event.find({})
			 .exec(function(err, data){
				if(err){
					return next(err)
				}
				res.json(data)
			 })
	},
	eventInfoMobile: (req, res, next) => {
		Event.findById(req.params.id, function(err, data){
			res.json(data)
		})
	}
}
