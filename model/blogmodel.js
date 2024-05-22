var mongoose = require('mongoose');

var blogschema = new mongoose.Schema({
    title_1:{
        type:String
    },
    title_2:{
        type:String
    },
    blog_category:{
        type:String
    },
    blog:{
        type:String
    },
    blog_img:{
        type:String
    },
    like : [{
        type : mongoose.Schema.Types.ObjectId,
    }],
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    status:{
        type:Number
    }
})


module.exports = mongoose.model('blog',blogschema)