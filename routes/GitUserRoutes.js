const express = require('express');
const router = express.Router();
const git = require('../controllers/Git');
const verifier=require('../middleware/apikeyverification')
router.get('/getUser/:apikey', verifier.verify,git.getUser);
router.get("/getapikey",git.getApiKey);
router.get('/',git.gitdata);
module.exports = router;

