const express = require('express');
const CardController = require('../controllers/cardController');

const router = express.Router();

router.post('/get-user-cards', CardController.getUserCards);
router.post('/add-card', CardController.addCard);

module.exports = router;
