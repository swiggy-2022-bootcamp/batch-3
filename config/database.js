/* Connecting to SQLite3 using Sequelize ORM */

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite',
    logging: false
})

// Testing Database Connection
async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log('SQLite: ✔ Connected!');
        return;
    }
    catch(error) {
        console.log('SQLite: ❌ Error in Database Connection: ', error);
    }
}

// Synchronize all modals
async function synchronizeModels () {
    try {
        await sequelize.sync();
        console.log('SQLite: ✔ All Models were synchronized!');
    }
    catch(error) {
        console.log('SQLite: ❌ Error in Model Synchronization: ', error);
    }
}

checkConnection();
synchronizeModels();


module.exports = { sequelize }