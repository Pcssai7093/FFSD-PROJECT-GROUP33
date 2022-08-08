// * constants
// import {dv} from "dotenv"
const dv=require('dotenv')
// * no need of {path:"./name.env"} in config if file is not renamed 
dv.config()
const express = module.require('express');
const app = new express();
const mongoose = module.require('mongoose');
const bodyParser = module.require('body-parser');
const dbcon2='mongodb://Chandra7093:Raja7093@ffsdproject-shard-00-00.iound.mongodb.net:27017,ffsdproject-shard-00-01.iound.mongodb.net:27017,ffsdproject-shard-00-02.iound.mongodb.net:27017/FFSDProject?ssl=true&replicaSet=atlas-8pbmp1-shard-0&authSource=admin&retryWrites=true&w=majority'
const port=process.env.Port||3001;
console.log("port:"+port);
const homeroute=module.require('./Routes/home');
const adminroute=module.require('./Routes/admin');
const profileroute=module.require('./Routes/profile');
const descroute=module.require('./Routes/desc');
const ordersroute=module.require('./Routes/orders');
const postserviceroute=module.require('./Routes/postservice');
const wishlistroute=module.require('./Routes/wishlist');
const LogSignMisc=module.require('./Routes/LogSignMisc')
const UDM = module.require('./Userdata/userdatamodel');
const GDM = module.require('./Gigdata/Gigdatamodel');
const TDM = module.require('./transactions/transactionmodel');

const Auth =require("./Middleware/Authenticate")

const cookieparser=require("cookie-parser")
app.use(cookieparser())
mongoose.connect(process.env.database)
    .then((result) => {
        console.log('connected to db');
        app.listen(port);
    })
    .catch((err) => console.log(err));
// *body parser
app.use(bodyParser.urlencoded({ extended: true }));
// * view engine initialisation
app.set('view engine', 'ejs');
// * static public files
app.use(express.static('./public/Homepage'));
app.use(express.static('./public/Navbar'));
app.use(express.static('./public/Descpage'));
app.use(express.static('./public/Profilepage'));
app.use(express.static('./public/postgigpage'));
app.use(express.static('./public/Signuppage'));
app.use(express.static('./public/Wishlist'));
app.use(express.static('./public/Landingpage'));
app.use(express.static('./public/Adminpage'));
app.use(express.static('./public/Userorders'));
app.use(express.static('./public/Aboutus'));
app.use(express.static('./public/Contactus'));


app.use(LogSignMisc)
// app.use(Auth)
app.use('/home',Auth,homeroute);
app.use('/admin',Auth,adminroute);
app.use('/profile',Auth,profileroute);
app.use('/descpage',Auth,descroute);
app.use('/orders',Auth,ordersroute);
app.use('/postgig',Auth,postserviceroute);
app.use('/wishlist',Auth,wishlistroute);



app.post('/wishlistdelete/:id', async (req,res)=>{
    const uid=req.params.id;
    let gigid=req.body.gigid;


    await UDM.find({_id:uid})
    .then(async(res)=>{
        let flag=0;
        console.log(res[0].wishlist.length);
        for(let i=0;i<res[0].wishlist.length;i++){
            if(res[0].wishlist[i]==gigid){
            flag=1;
            break;
            }
        }

        if(flag!=0){
           await UDM.updateOne({_id:uid},{$pull:{wishlist:gigid}})
            .then((res)=>{
    
             })
            .catch((err)=>{
            console.log(err);
            });
        }
    })
    .catch((err)=>{
       console.log(err);
    });


    res.redirect('/wishlist/'+uid);
});









