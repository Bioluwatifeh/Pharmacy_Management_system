const express = require('express');
const router = express.Router();

// TODO: implement report routes
router.get('/', (req, res) => res.json({ message: 'Reports' }));

module.exports = router;
