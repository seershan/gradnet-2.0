const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String,
    graduationYear: Number,
    aboutMe: String,
    experience: [{
        title: String,
        company: String,
        startDate: Date,
        endDate: Date
    }],
    education: [{
        degree: String,
        field: String,
        institution: String,
        graduationYear: Number
    }],
    skills: [String]
});

module.exports = mongoose.model('User', userSchema);

