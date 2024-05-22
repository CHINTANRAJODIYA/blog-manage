const adminmodel = require("../model/adminmodel");
const blogmodel = require("../model/blogmodel");
const categorymodel = require("../model/categorymodel");
const usermodel = require("../model/usermodel");

exports.login = async (req,res)=>{
    
    var data = await adminmodel.find({"email":req.body.email});
    
    if(data.length>0){
        if(data[0].password==req.body.password)
        {
        res.status(200).json({
            status:"login success"
        })
        }else
        {
            res.status(200).json({
                status:"Check Your Email And Password"
            }) 
        }
    }else
    {
        res.status(200).json({
            status:"Check Your Email And Password"
        })
    }
}

exports.viewblog = async (req,res) =>{

    var data = await blogmodel.find();

    res.status(200).json({
        status:"blog selected",
        data    
    })
}

exports.userviewblog = async (req,res) =>{

    var u_id =  req.params.id;
    
    var data = await blogmodel.find({user_id:u_id});

    res.status(200).json({
        status:"blog selected user wise",
        data    
    })
}

exports.statusblog = async (req,res) =>{

    var data = await blogmodel.find({status:1});

    res.status(200).json({
        status:"blog selected status 1",
        data    
    })
}

exports.updateblog = async (req,res) =>{

    var id = req.params.id;
    var data = await blogmodel.findByIdAndUpdate(id,req.body);

    res.status(200).json({
        status:"blog updated",
        data    
    })
}

exports.deleteblog = async (req,res) =>{

    var id = req.params.id;
    var data = await blogmodel.findByIdAndDelete(id);

    res.status(200).json({
        status:"blog delete",
    })
}

exports.manageuser = async (req,res) =>{

    var id = req.params.id;
    var data = await usermodel.findByIdAndDelete(id,req.body);

    res.status(200).json({
        status:"user delete",
    })
}