const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,

    researchers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    startDate: Date,
    endDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
