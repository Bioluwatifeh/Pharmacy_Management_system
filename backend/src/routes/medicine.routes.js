const express = require('express');
const router = express.Router();

// TODO: implement medicine routes
router.get('/', (req, res) => res.json({ message: 'List medicines' }));

module.exports = router;
