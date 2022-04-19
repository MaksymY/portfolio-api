const Skills = require('../models/skill');

exports.postSkills = async (req, res) => {
    try {
        let skill = new Skills();
        skill.icon = req.body.icon;
        skill.skill = req.body.skill;
        skill.skills = req.body.skills;

        await skill.save();

        res.json({
            sucess: true,
            message: "successfully created new Skills"
        });
    } catch(err) {
        res.status(500).json({
            sucess: false,
            message: err.message
        });
    }
};

exports.getSkills = async(req, res, next) => {
    try {
        let skills = await Skills.find();
        res.json({
            sucess: true,
            skills: skills
        })
    } catch(err) {
        res.status(500).json({
            sucess: false,
            message: err.message
        });
    }
}