const CardModel = require('../models/cardModel');

const AuthController = {
    getUserCards: async (req, res) => {
        const { userId } = req.body;
        try {
            const userCards = await CardModel.getUserCards(userId);
            // Transform into array of card IDs
            const cardIds = userCards.map((card) => card.id);
            res.status(200).json({ message: 'User cards retrieved successfully', cards: cardIds });
        } catch (error) {
            console.error('Error during getting user cards:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    addCard: async (req, res) => {
        const { userId, cardId } = req.body;

        try {
            await CardModel.addCard(cardId, userId);
            res.status(201).json({ message: 'Card added successfully' });
        } catch (error) {
            console.error('Error during adding card:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = AuthController;
