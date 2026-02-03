const express = require('express');
const router = express.Router();

// TODO: implement wholesale routes
router.post('/', (req, res) => res.json({ message: 'Create wholesale order' }));

module.exports = router;
