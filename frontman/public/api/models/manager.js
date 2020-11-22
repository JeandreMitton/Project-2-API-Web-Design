const mongoose = require('mongoose');

// Creating Schema defining what product will look like
const managerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,   //Long string as Serial ID not number
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true}//,
   // image: {type: Image(Number, Number), required: true}
});

// Exporting Schema(Layout of object) wrapped into model(Object itself)
// Model is constructoir to build such object based on the schema
module.exports = mongoose.model('Manager', managerSchema);