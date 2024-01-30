const db = require('../config/db');

const UserModel = {
    createUser: (username, password) => {
        return new Promise((resolve, reject) => {
            const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
            stmt.run(username, password, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            stmt.finalize();
        });
    },
    getUserByUsername: (username) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
};

module.exports = UserModel;
