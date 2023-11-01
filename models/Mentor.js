const mongoose = require('mongoose')

const MentorSchema = mongoose.Schema({
    
    date: {
        type: String
    },
    branch_year: {
        type: String
    },
    name: {
        type: String
    },
    rollno: {
        type: String
    },
    topic: {
        type: String
    },
   
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Mentor', MentorSchema)