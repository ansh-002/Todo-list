const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const task = new Schema({
    name:{
        type:String,
        required:[true,"name cannot be blank"]
    }
});

const Task = mongoose.model('Task',task);
module.exports = Task;