const mongoose=module.require('mongoose');
const schm=mongoose.Schema;
const bcrypt=module.require("bcrypt")

const userschm=new schm({
    
    First_name:{
        type:String,
        required:true
    },
    Last_name:{
        type:String,
        required:true
    },
    Age:{
        type:Date,
        required:true
    },
    User_name:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Mob_number:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    User_pfimg:{
        type:String, 
    },
    wishlist:{
        type:[{
            type:String
        }]
    },
    User_about:{
        type:String
    },
    User_Block:{
        type:String
    }

},{timestamps:true},);

userschm.pre("save",async function (next){
    // console.log(this.password);
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt)
    console.log("before user created");
    next();
})

const userdatamodel=mongoose.model('user-datas',userschm);
module.exports=userdatamodel;




