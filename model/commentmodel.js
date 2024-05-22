var mongoose = require('mongoose');

var commentschema = new mongoose.Schema({
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    Comment:{   
        type:String
    }
})

module.exports = mongoose.model('comment',commentschema)