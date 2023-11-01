const mongoose = require('mongoose')

const Alumni_feedSchema = mongoose.Schema({
    
    Email: {
        type: String
    },
    department: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    degree: {
        type: String
    },
    branch: {
        type: String
    },
    passing_year: {
        type: String
    },
    enrollment_no: {
        type: String
    },
    organization_name: {
        type: String
    },
    designation: {
        type: String
    },
    joining_year: {
        type: String
    },
    
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Alumni_feed', Alumni_feedSchema)