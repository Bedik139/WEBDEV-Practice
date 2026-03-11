require('dotenv/config');   // loads .env variables
const express = require('express');
const exphbs = require('express-handlebars');

const { connect } = require('./src/models/conn.js');
const router = require('./src/routes/mainRouter.js');

async function main() {
    const app = express();

    app.use('/static', express.static('public'));
    app.engine("hbs", exphbs.engine({
        extname: "hbs",
        helpers: {
            /**
             * Formats Date object into locale date time string format 
             * @param {Date} date object to transform into the locale's format
             * @returns a string representing the locale format (usually GMT) of the date object
             */
            toLocale: function (date) {
                // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
                return date.toLocaleString();
            }
        }
    }));
    app.set("view engine", "hbs");
    app.set("views", "./src/views");

    // Parse request body as json
    app.use(express.json());
    // Apply routes to express app
    app.use(router);

    app.listen(process.env.PORT, async function() {
        console.log(`express app is now listening on port ${process.env.PORT}`);
        try {
            await connect();
            console.log(`Now connected to MongoDB`);
        } catch (err) {
            console.log('Connection to MongoDB failed: ');
            console.error(err);
        }
    });
}

main();
