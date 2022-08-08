const express=module.require('express');
const router=express.Router();
const UDM = module.require('../Userdata/userdatamodel');
const GDM = module.require('../Gigdata/Gigdatamodel');
const TDM = module.require('../transactions/transactionmodel');


router.route('/:id')
    .get(async (req,res)=>{
        const uid = req.params.id;

   await UDM.find({ _id: uid })
        .then((result) => {
            res.render('profile', { User_name: result[0].User_name,User_namepf:result[0].User_name, User_Name: result[0].User_name, profile: 'active', User_id: result[0]._id.toString(),User_idpf: result[0]._id.toString(),Full_name:result[0].First_name,User_about:result[0].User_about,pf_img:result[0].User_pfimg
        });
        })
        .catch((err) => {
            console.log(err);
    });
});


router.route('/addDetails/:id')
    .post(async (req,res)=>{
        const uid=req.params.id;
    // let array=req.body.profile_img.split(/(\\|\/)/g);
    // let img=array[array.length-1];
    console.log(req.body);
    await UDM.updateOne({_id:uid},{$set:{First_name:req.body.Full_name,User_about:req.body.User_about,User_pfimg:req.body.profile_img}})
    .then((res)=>{

    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect('/profile/'+uid);
});


router.route('/:id/:id2')
    .get(async (req,res)=>{
        const uid = req.params.id;
        const sid = req.params.id2;
        let seller_Name = '';

    await UDM.find({ _id: uid })
        .then((result) => {
            User_Name = result[0].User_name;
        })
        .catch((err) => {
            console.log(err);
        });


    await UDM.find({ _id: sid })
        .then((result) => {
            if(uid!=sid){
            res.render('profile', { User_name:User_Name,User_namepf:result[0].User_name,  profile: 'active',User_id:uid,User_idpf: result[0]._id.toString(),Full_name:result[0].First_name, pf_img:result[0].User_pfimg,User_about:result[0].User_about,hide:'inactive'});
            }
            else{
                console.log('hii1');
                res.render('profile', { User_name:User_Name,User_namepf:result[0].User_name,  profile: 'active',User_id:uid,User_idpf: result[0]._id.toString(),Full_name:result[0].First_name, pf_img:result[0].User_pfimg,User_about:result[0].User_about});
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports=router;