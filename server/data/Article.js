const mongoose = require('mongoose')
let User = require('./User')
let Schema = mongoose.Schema


//let requiredValidationMessage = '{PATH} is required'

let articleSchema = new mongoose.Schema({
  description: { type: String},
  _creator: { type: Schema.Types.ObjectId, ref: 'User'}
},{collection: 'articles'})

//articleSchema.pre('save', (next) => {
  //  var self = this;
	//User.findById( self.user, (err, user) => {
		//if (err) // Do something
		//self._creator = self.user._id

		//next();
	//});
  //})


let Article = mongoose.model('Article', articleSchema)

function seedArticle(){
  Article.find({}).then(articles => {
    if (articles.length === 0) {

      Article.create({
        description: 'Desc',
		_creator: '5821cdad9718501594815707'
      })
    }
  })
}

module.exports ={
	Article: Article,
	seedArticle: seedArticle
} 
