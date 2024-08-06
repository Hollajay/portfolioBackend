const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, 'Name must be filled'],
  
  },
  email: {
    type: String,
    required: [true, 'Email must be filled'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject must be filled'],

  },
  message: {
    type: String,
    required: [true, 'Message must be filled']
  }
}, {
  timestamps: true
});

const clientMessage = mongoose.model('portfolioMessage', clientSchema);

module.exports = clientMessage;
