const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Notes"
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : String
})
const Notes = mongoose.model('Notes',notesSchema);

module.exports = Notes;