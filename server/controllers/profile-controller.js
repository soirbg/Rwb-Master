let User = require('mongoose').model('User')
let Article = require('mongoose').model('Article')

module.exports = {
  profile: (req, res,next) => {
	  let user = req.user
	  User.find().exec(function(err, data) {
            if(err) {
                return next(err)
            }
            Article.find({ _creator: user._id}).exec(function(err, art){
				if(err){
					return next(err)
				}
				console.log(art._id)
				
				res.render('users/profile', {data: data, art: art})
			})
		})
	}
}
