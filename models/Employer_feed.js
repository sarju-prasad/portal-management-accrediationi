const mongoose = require('mongoose')

const Employer_feedSchema = mongoose.Schema({
    
    Email: {
        type: String
    },
    name: {
        type: String
    },
    organization_name: {
        type: String
    },
    designation: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
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

module.exports = mongoose.model('Employer_feed', Employer_feedSchema)