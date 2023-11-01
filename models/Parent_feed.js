const mongoose = require('mongoose')

const Parent_feedSchema = mongoose.Schema({
    
    Email: {
        type: String
    },
    name: {
        type: String
    },
    relation: {
        type: String
    },
    s_name: {
        type: String
    },
    branch: {
        type: String
    },
    academic_year: {
        type: String
    },
    Option1: {
        type: String
    },
    Option2: {
        type: String
    },
    Option3: {
        type: String
    },
    Option4: {
        type: String
    },
    Option5: {
        type: String
    },
    
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Parent_feed', Parent_feedSchema)