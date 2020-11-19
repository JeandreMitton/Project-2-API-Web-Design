const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,   
   // member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},  
 //   image: {data: Buffer, contentType: String, required: true}
});

module.exports = mongoose.model('Member', memberSchema);