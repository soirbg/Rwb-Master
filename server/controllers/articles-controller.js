let User = require('mongoose').model('User')
let Article = require('mongoose').model('Article')

module.exports = {
  list: (req, res,next) => {
	  Article.find({})
			 .exec(function(err, data) {
            if(err) {
                return next(err);
            }
            res.render('users/article',{art: data})
        })
    },
	createArticle:(req, res) => {
		res.render('users/cArticle')
	},
	create: (req, res, next) =>{
		let user = req.user
		
		user.save(function(err) {
			
			let article = new Article({
				description: req.body.description,
				_creator: user._id
			})
			
			User.findById(req.user._id, function(err, user) {
			  if (!user)
				return next(new Error('Could not load Document'));
			  else {
				// do your updates here
				user.articles.push(article._id)

				user.save(function(err) {
				  if (err)
					console.log('error')
				  else
					console.log('success')
				});
			  }
			})
			
			article.save(function(err){
					Article.populate(article, '_creator', function(err, book) {
					console.log(article._creator.username);
				})
			})
			
		})
		res.redirect('/')
	},
	info: (req, res, next) => {
        Article.findById(req.params.id, function(err, data){
            res.json(data);
        });
	}
}
