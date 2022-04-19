const express = require('express');

const skillsController = require('../controllers/skills.js');

const router = express.Router();

router.post('/skills', skillsController.postSkills);
router.get('/skills', skillsController.getSkills);

module.exports = router;