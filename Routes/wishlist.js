const express=module.require('express');
const router=express.Router();
const UDM = module.require('../Userdata/userdatamodel');
const GDM = module.require('../Gigdata/Gigdatamodel');
const TDM = module.require('../transactions/transactionmodel');


router.route('/:id')
    .get(async (req,res)=>{
        const uid = req.params.id;
        let gigdata = [];
        let gig_id=[];
        await UDM.find({ _id: uid })
        .then(async (result) => {
        
        // ! why in not working
            for(let i=0;i<result[0].wishlist.length;i++){
                await GDM.find({_id:result[0].wishlist[i]})
                .then(async (result) => {
                    for (let i = 0; i < result.length; i++) {
        
                        let userid = result[i].Seller_id;
                        let userName;
        
                        await UDM.find({ _id: userid })
                            .then((result) => {
                                userName = result[0].User_name;
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        gigdata.push({
                            'tnimg': result[i].Gig_tnimg,
                            'user_name': userName,
                            'data_desc': result[i].Gig_title,
                            'price': result[i].Basic_price,
                            'gig_id': result[i]._id.toString(),
                            'mainuser_id': uid
                        });
                    }
                })
                .catch((err) => {
                    // console.log(err);
                });
            }
           
        })
        .catch((err) => {
            console.log(err);
        });
    
        UDM.find({ _id: uid })
            .then((result) => {
                res.render('wishlist', { User_name: result[0].User_name, User_id: result[0]._id.toString(), wishlist: 'active',gig_data: gigdata });
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .post(async (req,res)=>{
 // res.send(req.body); 
 const uid=req.params.id;
 // console.log(uid);
 let gigid=req.body.gigid;
 // console.log(gigid);

await UDM.find({_id:uid})
 .then(async(res)=>{
     let flag=0;
     // console.log(res[0].wishlist.length);
     for(let i=0;i<res[0].wishlist.length;i++){
         if(res[0].wishlist[i]==gigid){
         flag=1;
         break;
         }
     }

     if(flag==0){
        await UDM.updateOne({_id:uid},{$push:{wishlist:gigid}})
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

module.exports=router;