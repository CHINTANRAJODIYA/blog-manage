const blogmodel = require("../model/blogmodel");
const commentmodel = require("../model/commentmodel");
const usermodel = require("../model/usermodel");
const storage = require('node-persist');
storage.init()
exports.register = async (req, res) => {
    var data = await usermodel.create(req.body);
    res.status(200).json({
        status: "register success",
        data
    })

}

exports.login = async (req, res) => {

    var data = await usermodel.find({ "email": req.body.email });

    var id = await storage.setItem('u_id', data[0].id)

    if (data.length > 0) {
        if (data[0].password == req.body.password) {
            res.status(200).json({
                status: "login success"
            })
        } else {
            res.status(200).json({
                status: "Check Your Email And Password"
            })
        }
    } else {
        res.status(200).json({
            status: "Check Your Email And Password"
        })
    }
}

exports.addblog = async (req, res) => {
    req.body.blog_img = req.file.originalname;
    var u_id = await storage.getItem('u_id');
    req.body.user_id=u_id;

    var data = await blogmodel.create(req.body);

    res.status(200).json({
        status: "blog added",
        data
    })

}

exports.addcategory = async (req, res) => {
    var data = await categorymodel.create(req.body);

    res.status(200).json({
        status: "category added",
        data
    })
}

exports.viewblog = async (req, res) => {
    var data = await blogmodel.find();

    res.status(200).json({
        status: "blog selected",
        data
    })
}

exports.updateblog = async (req, res) => {

    var id = req.params.id;
    var data = await blogmodel.findByIdAndUpdate(id, req.body);

    res.status(200).json({
        status: "blog updated",
        data
    })
}

exports.deleteblog = async (req, res) => {

    var id = req.params.id;
    var data = await blogmodel.findByIdAndDelete(id, req.body);

    res.status(200).json({
        status: "blog delete",
        data
    })
}

exports.likeblog = async (req, res) => {
    var id = req.params.id
    var data = await blogmodel.findById(id)
    var u_id = await storage.getItem('u_id')
    console.log(u_id)
    var like = data.like;

    if (!like.includes(u_id)) {
        like.push(u_id);
        // req.body.like=like;
        // console.log(req.body.like)
        res.status(200).json({
            status: "liked"
        })
    }
    else {
        like = like.filter(function(item){
            return item != u_id;
        });
        res.status(200).json({
            status: "unliked"
        })
    }

    var update_like = await blogmodel.findByIdAndUpdate(id, { like: like })
}

exports.comment = async (req, res) => {

    var id = req.params.id;
    var u_id = await storage.getItem('u_id');
    req.body.blog_id = id;
    req.body.user_id=u_id;
    var data = await commentmodel.create(req.body);

    res.status(200).json({
        status: "comment done",
        data
    })
}

exports.viewcomment = async (req, res) => {

    var id = req.params.id;
    var data = await commentmodel.find({blog_id:id}).populate('user_id');

    res.status(200).json({
        status: "comment find",
        data
    }) 
}



