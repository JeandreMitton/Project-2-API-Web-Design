const mongoose = require('mongoose');

// Creating Schema defining what product will look like
const managerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,   //Long string as Serial ID not number
//   manager: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true},
//  name: {type: String, required: true},
//   role: {type: Number, default: 1}
});

// Exporting Schema(Layout of object) wrapped into model(Object itself)
// Model is constructoir to build such object based on the schema
module.exports = mongoose.model('Manager', managerSchema);