const express = require('express');
const router = express.Router();
// Cart is managed client-side (localStorage) for simplicity.
// This route is a placeholder if you want server-side cart later.

router.get('/', (req, res) => {
  res.json({ message: 'Cart is managed client-side. Use localStorage on the frontend.' });
});

module.exports = router;
