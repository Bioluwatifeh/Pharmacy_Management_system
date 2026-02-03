const express = require('express');
const router = express.Router();

// TODO: implement customer controller routes
router.get('/', (req, res) => res.json({ message: 'List customers' }));

module.exports = router;
