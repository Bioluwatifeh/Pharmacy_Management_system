const express = require('express');
const router = express.Router();

// TODO: implement payment routes
router.post('/', (req, res) => res.json({ message: 'Process payment' }));

module.exports = router;
