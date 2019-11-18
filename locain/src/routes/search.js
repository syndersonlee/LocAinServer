var express = require('express');
var router = express.Router();

var searchController = require('../controller/searchController');

router.get('/result', searchController.getSearchResult);
router.get('/', searchController.getSearch);

module.exports = router;