const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  text:{
    type:String,
    trim:true,
    minlength:1
  },
  from:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,"Message must have who writed?"]
  },
  to:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,"Message must have who write it for who?"]
  },
  createdAt:{
    type:Date,
    required:[true,"Message must have date."]
  }
})

MessageSchema.pre('save', function (next) {
    this.createdAt = new Date();
    next();
})
module.exports = mongoose.model("Message", MessageSchema);