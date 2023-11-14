const router = require('express').Router();

router.get('/data', (req, res) => {
  try {
    return res.status(200).json('Hello World');
  } catch (error) {
    return res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
