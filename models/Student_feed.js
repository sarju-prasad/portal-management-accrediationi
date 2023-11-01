const mongoose = require('mongoose')

const Student_feedSchema = mongoose.Schema({
    
    Email: {
        type: String
    },
    academic_year: {
        type: String
    },
    semester: {
        type: String
    },
    course1: {
        type: String
    },
    RadioOption1: {
        type: String
    },
    RadioOption2: {
        type: String
    },
    RadioOption3: {
        type: String
    },
    RadioOption4: {
        type: String
    },
    RadioOption5: {
        type: String
    },
    
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Student_feed', Student_feedSchema)