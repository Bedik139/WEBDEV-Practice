require('dotenv/config');   // loads .env variables
const { connect, disconnect } = require('./src/models/conn.js');
const Account = require('./src/models/Account.js');

/**
 * Deletes the data written in the database, and populates the database with 3 sample data.
 * You comment out lines 13-32 if you wish to simply delete all account data from the database.
 */
async function populateDB() {
    try {
        await connect();
        await Account.deleteMany({}).exec();
        const results = await Account.create([
            {
                accountName: 'John Smith',
                debtAmount: 135.66,
                lastUpdated: new Date(2024,2,17,14,35,25)
            },
            {
                accountName: 'Juan Dela Cruz',
                debtAmount: 4523.55,
                lastUpdated:  new Date(2024,2,16,8,45,44)
            },
            {
                accountName: 'Jane Doe',
                debtAmount: 25.0,
                lastUpdated:  new Date(2024,2,16,6,22,21)
            },
        ]);

        console.log('Database has been populated: ');
        console.log(results);
        disconnect();
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

populateDB();