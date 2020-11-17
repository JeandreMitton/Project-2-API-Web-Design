const mongoose = require('mongoose');

// Creating Schema defining what product will look like
const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,   //Long string as Serial ID not number
//    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
//   quantity: {type: Number, default: 1}
});

// Exporting Schema(Layout of object) wrapped into model(Object itself)
// Model is constructoir to build such object based on the schema
module.exports = mongoose.model('Member', memberSchema);