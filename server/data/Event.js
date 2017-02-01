const mongoose = require('mongoose')
//let User = require('./User')
let Schema = mongoose.Schema


let requiredValidationMessage = '{PATH} is required'

let eventSchema = new mongoose.Schema({
  time: { type: String, required: requiredValidationMessage},
  eventName: { type: String, required: requiredValidationMessage },
  speaker: { type: String },
  overview: { type: String },
  aboutCompany: { type: String },
  hall: { type: String},
  picture: { type: String }
},{collection: 'events'})

let Event = mongoose.model('Event', eventSchema)

module.exports ={
	Event: Event
} 
