var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ParentsSchema   = new Schema({
    name: String,
    birthdate: String,
    father: String
});

module.exports = mongoose.model('Parents', ParentsSchema);