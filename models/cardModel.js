const db = require('../config/db');

const UserModel = {
    addCard: (id, owner) => {
        console.log('Adding card', id, 'to user', owner);
        return new Promise((resolve, reject) => {
            const stmt = db.prepare('INSERT INTO cards (id, owner) VALUES (?, ?)');
            stmt.run(id, owner, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            stmt.finalize();
        });
    },
    getUserCards: (userId) => {
        return new Promise((resolve, reject) => {
            // Return all cards that belong to the user as an array
            db.all('SELECT * FROM cards WHERE owner = ?', [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
    )}
};

module.exports = UserModel;
