const express=module.require('express');
const router=express.Router();
const UDM = module.require('../Userdata/userdatamodel');
const GDM = module.require('../Gigdata/Gigdatamodel');
const TDM = module.require('../transactions/transactionmodel');

router.route('/:id/:id2')
    .get(async (req,res)=>{
        const uid = req.params.id;
        const gid = req.params.id2;
        let sid = '';
        console.log(uid);
        let user_Name = '';
        await UDM.find({ _id: uid })
            .then((result) => {
                user_Name = result[0].User_name;
            })
            .catch((err) => {
                console.log(err);
            });
    
        await GDM.find({ _id: gid })
            .then(async (result) => {
                // console.log(result[0]);
    
                let ratcntary=[0,0,0,0,0];
                let ratcnt;
                let revary=[];
    
                await TDM.find({gigid:gid})
                .then(async (res)=>{
                    // console.log(res);
                    for(let i=0;i<res.length;i++){
                            let reviewername;
                            let review=res[i].review;
                            let reviewerrating=res[i].rating;
                            let reviewerpf;
                            await UDM.find({_id:res[i].userid})
                            .then((res)=>{
                                reviewername=res[0].User_name;
                                reviewerpf=res[0].User_pfimg;
                            })
                            .catch((err)=>{
                                console.log(err);
                            });
                            
                            // console.log(review,reviewername);
                            revary.push({
                                reviewername:reviewername,
                                review:review,
                                reviewerrating: reviewerrating,
                                reviewerpf:reviewerpf,
                            })
                            if(res[i].rating==5){
                            ratcntary[4]++;
                            }
                            else if(res[i].rating==4){
                                ratcntary[3]++;
                            }
                            else if(res[i].rating==3){
                                ratcntary[2]++;
                            }
                            else if(res[i].rating==2){
                                ratcntary[1]++;
                            }
                            else if(res[i].rating==1){
                                ratcntary[0]++;
                            }
                    }
                })
                .catch((err)=>{
                    console.log(err);
                });
    
                console.log(revary);
               await TDM.countDocuments({"rating":{"$exists":true},gigid:gid})
                .then((cnt)=>{
                    ratcnt=cnt;
                })
                .catch((err)=>{
                    console.log(err);
                })
    
                console.log(ratcnt,ratcntary);
                
    
                let seller_Name = '';
                await UDM.find({ _id: result[0].Seller_id })
                    .then((result) => {
                        seller_Name = result[0].User_name;
                        User_about=result[0].User_about;
                        User_pfimg= result[0].User_pfimg;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
    
                res.render('descpage', {
                    User_name: user_Name, User_id: uid,Gig_id:gid, desc_data:
                    {
                        gig_title: result[0].Gig_title,
                        Basic_price: result[0].Basic_price,
                        Standard_price: result[0].Standard_price,
                        Premium_price: result[0].Premium_price,
                        Basic_desc: result[0].Basic_desc,
                        Standard_desc: result[0].Standard_desc,
                        Premium_desc: result[0].Premium_desc,
                        Gig_desc: result[0].Gig_desc,
                        Seller_name: seller_Name,
                        Seller_info:User_about,
                        seller_id: result[0].Seller_id,
                        Gig_img2:result[0].Gig_img2,
                        Gig_img3:result[0].Gig_img3,
                        Gig_img4:result[0].Gig_img4,
                        Gig_img5:result[0].Gig_img5,
                        Gig_ratcnt:ratcnt,
                        Gig_rat:ratcntary,
                        Gig_revs:revary,
                        User_pfimg:User_pfimg,
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
});

router.route('/checkout/:uid/:gid')
    .post(async (req,res)=>{

         const tdm=new TDM({
        userid:req.params.uid,
        gigid:req.params.gid,
        amount:req.body.payamount
         })
        tdm.save()
        .then((result)=>{
        res.redirect('/orders/'+req.params.uid);
         })
        .catch((err)=>{
        console.log(err);
        });

});

module.exports=router;