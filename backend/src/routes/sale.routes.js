const express = require('express');
const router = express.Router();

// TODO: implement sale routes
router.post('/', (req, res) => res.json({ message: 'Create sale' }));

module.exports = router;
