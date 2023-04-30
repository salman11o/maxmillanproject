const express = require('express');
const router = express.Router();
const git = require('../controllers/Git');

router.post('/',git.gitdata,git.UserCreation);

module.exports = router;

