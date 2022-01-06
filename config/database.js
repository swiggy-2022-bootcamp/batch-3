/* Connecting to SQLite3 using Sequelize ORM */

// Import Sequelize
const Sequelize = require('sequelize');

// Create Sequelize Instance
const sequelize = new Sequelize({
    dialect: 'sqlite', // Database driver
    storage: './db/database.sqlite', // Storage path
    // logging: msg => console.log(msg), // Logging Queries
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
        await sequelize.sync({ force: true });
        console.log('SQLite: ✔ All Models were synchronized!');
    }
    catch(error) {
        console.log('SQLite: ❌ Error in Model Synchronization: ', error);
    }
}

checkConnection();
synchronizeModels();



// Export the Sequelize Instance
module.exports = { sequelize }