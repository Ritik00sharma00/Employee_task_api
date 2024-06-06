const mongoose = require('mongoose');

function gettedDate() {
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; 
var day = currentDate.getDate();
var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
return formattedDate;
}
console.log(gettedDate);


const userSchema = new mongoose.Schema({
    task: String,
    task_id: String,
    employeeName: String,
    time: { type: Date, default: new Date().getTime() },
    modifiedDate: Date, 
    priority: String,
    description: String,
    photo:String
});

userSchema.pre('save', async function(next) {
    if (!this.task_id) {
        const { nanoid } = await import('nanoid');
        this.task_id = nanoid(4);
    }
    if (this.isModified('task')) {
    }
    this.modifiedDate = new Date();
    next();
});

const user_model = mongoose.model('usertask', userSchema);
module.exports = user_model;