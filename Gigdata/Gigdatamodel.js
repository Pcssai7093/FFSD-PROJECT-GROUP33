const mongoose=module.require('mongoose');
const schm=mongoose.Schema;

const userschm=new schm({
    Gig_title:{
        type:String,
        required:true
    },
    Gig_desc:{
        type:String,
        required:true
    },
    Basic_price:{
        type:Number,
        required:true
    },
    Basic_desc:{
        type:String,
        required:true
    },
    Standard_price:{
        type:Number,
        required:true
    },
    Standard_desc:{
        type:String,
        required:true
    },
    Premium_price:{
        type:Number,
        required:true
    },
    Premium_desc:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Gig_tnimg:{
        type:String,
    },
    Gig_img2:{
        type:String,
    },
    Gig_img3:{
        type:String,
    },
    Gig_img4:{
        type:String,
    },
    Gig_img5:{
        type:String,
    },
    Seller_id:{
        type:String,
        required:true
    },
    Gig_Block:{
        type:String
    }

},{timestamps:true},);


const Gigdatamodel=mongoose.model('gig-datanews',userschm);
module.exports=Gigdatamodel;