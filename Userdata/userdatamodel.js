const mongoose=module.require('mongoose');
const schm=mongoose.Schema;

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
    User_password:{
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




const userdatamodel=mongoose.model('user-datas',userschm);
module.exports=userdatamodel;