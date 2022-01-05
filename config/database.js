/* Connecting to SQLite3 using Sequelize ORM */

// Import Sequelize
const Sequelize = require('sequelize');

// Create Sequelize Instance
const sequelize = new Sequelize({
    dialect: 'sqlite', // Database driver
    storage: '../db/database.sqlite', // Storage path
    logging: msg => console.log(msg)
})

// Testing Database Connection
async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log('SQLite: ✔ Connected!');
    }
    catch(error) {
        console.log('SQLite: ❌ Error in Database Connection: ', error);
    }
}
checkConnection();

// Export the Sequelize Instance
module.exports = { sequelize }