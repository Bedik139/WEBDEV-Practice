const { Schema, SchemaTypes, model } = require('mongoose');

// TODO: define the schema below.
/*()
 * The account schema should have the following fields:
 * - accountName (String), should be unique and is required
 * - debtAmount (Number), should be required, and the minimum value is 0
 * - lastUpdate (Date), no additional constraints aside from type.
 */
const accountSchema = new Schema({
    // your code here
});

const Account = model('Account', accountSchema);

module.exports = Account;