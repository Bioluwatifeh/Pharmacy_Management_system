const express = require('express');
const router = express.Router();

// TODO: implement inventory routes
router.get('/', (req, res) => res.json({ message: 'Inventory list' }));

module.exports = router;
