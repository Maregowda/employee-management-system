const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});
//By default Employee can be convert into employees i.e plural andlowercase of your modelname by mongodb and searches
module.exports = mongoose.model('Employee', employeeSchema);