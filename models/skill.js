const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    icon: String,
    skill: String,
    skills: String,
});

module.exports= mongoose.model('Skill', skillSchema);