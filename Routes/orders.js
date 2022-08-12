const express=module.require('express');
const router=express.Router();
const UDM = module.require('../Userdata/userdatamodel');
const GDM = module.require('../Gigdata/Gigdatamodel');
const TDM = module.require('../transactions/transactionmodel');


router.route('/:id')
    .get(async (req,res)=>{
        const uid=req.params.id;
        let gigdata = [];
    
            await TDM.find({userid:uid}).sort({createdAt:-1})   
            .then(async (res)=>{
                // console.log(res);
                for(let i=0;i<res.length;i++){
                    // console.log('e');
                    await GDM.find({_id:res[i].gigid})
                    .then(async (result) => {
                        let rating=0;
                        let ratingcnt=0;
    
                        await TDM.countDocuments({
                            $and:[{
                                rating:{"$exists":true},
                            },
                            {
                                gigid:result[0]._id
                            }
                            ]   
                        })
                        .then((cnt)=>{
                        ratingcnt=cnt;
                        })
                        .catch((err)=>{
                        console.log(err);
                        })
        
        
                        await TDM.find({
                            $and:[{
                                rating:{"$exists":true},
                            },
                            {
                                gigid:result[0]._id
                            }
                            ]   
                        })
                        .then((res)=>{
        
                            for(let j=0;j<res.length;j++){
                                if(res[j].rating>0)
                                rating+=res[j].rating;
                            }
        
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
        
        
                        if(ratingcnt!=0)
                        rating=rating/ratingcnt;
                        else{
                            rating="Not Yet";
                        }
    
    
                            let userid = result[0].Seller_id;
                            let userName;
    
                            await UDM.find({ _id: userid })
                                .then((result) => {
                                    userName = result[0].User_name;
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
    
    
                            gigdata.push({
                                'tnimg': result[0].Gig_tnimg,
                                'user_name': userName,
                                'data_desc': result[0].Gig_title,
                                'price': result[0].Basic_price,
                                'gig_id': result[0]._id.toString(),
                                'mainuser_id': uid,
                                'amount':res[i].amount,
                                'time':res[i].createdAt,
                                'transaction_id':res[i]._id,
                                'review':res[i].review,
                                'rating':res[i].rating,
                                'gig_rating':rating
                            });
                        
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    
    // console.log(gigdata);
        await UDM.find({ _id: uid })
            .then((result) => {
                res.render('userorders', { User_name: result[0].User_name, User_id: result[0]._id.toString(), userorders: 'active',gig_data: gigdata });
            })
            .catch((err) => {
                console.log(err);
            });
});


router.route('/addreview/:uid/:tid')
    .post(async (req,res)=>{
        await TDM.updateOne({_id:req.params.tid},{$set:{review:req.body.review,rating:req.body.user_rating}})
        .then((res)=>{
         
        })
        .catch((err)=>{
             console.log(err);
        });
        res.redirect('/orders/'+req.params.uid);
});


router.route('/addreport/:uid/:tid')
    .post(async (req,res)=>{
        await TDM.updateOne({_id:req.params.tid},{$push:{reports:req.body.report_text}})
         .then((res)=>{
    
         })
        .catch((err)=>{
        console.log(err);
         });
        res.redirect('/orders/'+req.params.uid);
});


module.exports=router;