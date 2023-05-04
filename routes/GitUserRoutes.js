const express = require('express');
const router = express.Router();
const git = require('../controllers/Git');

router.get('/users',git.gitdata);
router.get('/users/getUser', git.getUser);
module.exports = router;

