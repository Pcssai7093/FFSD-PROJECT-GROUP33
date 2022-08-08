const express=module.require('express');
const router=express.Router();
const UDM = module.require('../Userdata/userdatamodel');
const GDM = module.require('../Gigdata/Gigdatamodel');
const TDM = module.require('../transactions/transactionmodel');
const f1 =require('../Middleware/Authenticate')
const Auth =require('../Middleware/Authenticate')


// router.use(Auth);
// console.log(f1);
router
    .route("/:id")
    .get(async (req,res)=>{

        // console.log("home get");
     const uid = req.params.id;
    let gigdata = [];

    await GDM.find({Gig_Block:{$ne:'true'}})
        .then(async (result) => {
            for (let i = 0; i < result.length; i++) {
                let rating=0;
                let ratingcnt=0;
                await TDM.countDocuments({
                    $and:[{
                        rating:{"$exists":true},
                    },
                    {
                        gigid:result[i]._id
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
                        gigid:result[i]._id
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

                let userid = result[i].Seller_id;
                let userName;

                await UDM.find({ _id: userid })
                    .then((result) => {
                        userName = result[0].User_name;
                        User_pfimg= result[0].User_pfimg;
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
                    'mainuser_id': uid,
                    'gig_rating':rating,
                    'User_pfimg':User_pfimg
                });
            }
        })
        .catch((err) => {
            console.log();
        });
    UDM.find({ _id: uid })
        .then((result) => {
            res.render('homepage', { User_name: result[0].User_name, home: 'active', User_id: result[0]._id.toString(), gig_data: gigdata });
        })
        .catch((err) => {
            console.log(err);
        });

    })
    .post(async (req,res)=>{
    console.log(req.body);
    const uid = req.params.id;
    let gigdata = [];


    // todo filters


    if (req.body.sort == '3')
        await GDM.find({
            $and: [{ Category: { $in: req.body.cat } },
            { Basic_price: { $gte: req.body.f1 } }, { Basic_price: { $lte: req.body.f2 } },{Gig_Block:{$ne:'true'}}]
        }).sort({ createdAt: -1 })
            .then(async (result) => {
                for (let i = 0; i < result.length; i++) {
                    let userid = result[i].Seller_id;
                    let userName;

                    await UDM.find({ _id: userid })
                        .then((result) => {
                            userName = result[0].User_name;
                            User_pfimg= result[0].User_pfimg;
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
                        'mainuser_id': uid,
                        'User_pfimg':User_pfimg
                    });
                }
            })
            .catch((err) => {
                console.log();
            });

    // * newest last
    if (req.body.sort == '4')
        await GDM.find({$and:[{ Category: { $in: req.body.cat } },{Gig_Block:{$ne:'true'}}]}).sort({ createdAt: 1 })
            .then(async (result) => {
                for (let i = 0; i < result.length; i++) {
                    let userid = result[i].Seller_id;
                    let userName;

                    await UDM.find({ _id: userid })
                        .then((result) => {
                            userName = result[0].User_name;
                            User_pfimg= result[0].User_pfimg;
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
                        'mainuser_id': uid,
                        'User_pfimg':User_pfimg
                    });
                }
            })
            .catch((err) => {
                console.log();
            });

    // * newest last
    if (req.body.sort == '1')
        await GDM.find({$and:[{ Category: { $in: req.body.cat } },{Gig_Block:{$ne:'true'}}]}).sort({ Basic_price: 1 })
            .then(async (result) => {
                for (let i = 0; i < result.length; i++) {
                    let userid = result[i].Seller_id;
                    let userName;

                    await UDM.find({ _id: userid })
                        .then((result) => {
                            userName = result[0].User_name;
                            User_pfimg= result[0].User_pfimg;
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
                        'mainuser_id': uid,
                        'User_pfimg':User_pfimg
                    });
                }
            })
            .catch((err) => {
                console.log();
            });

    if (req.body.sort == '2')
        await GDM.find({$and:[{ Category: { $in: req.body.cat } },{Gig_Block:{$ne:'true'}}]}).sort({ Basic_price: -1 })
            .then(async (result) => {
                for (let i = 0; i < result.length; i++) {
                    let userid = result[i].Seller_id;
                    let userName;

                    await UDM.find({ _id: userid })
                        .then((result) => {
                            userName = result[0].User_name;
                            User_pfimg= result[0].User_pfimg;
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
                        'mainuser_id': uid,
                        'User_pfimg':User_pfimg
                    });
                }
            })
            .catch((err) => {
                console.log();
            });



    UDM.find({ _id: uid })
        .then((result) => {
            res.render('homepage', { User_name: result[0].User_name, home: 'active', User_id: result[0]._id.toString(), gig_data: gigdata });
        })
        .catch((err) => {
            console.log(err);
        });
    });

router
    .route("/search/:id")
    .post(async (req,res)=>{
        // console.log(req.body);
    let string1 = req.body.search_bar;
    const uid = req.params.id;
    let gigdata = [];


    await GDM.find({$and:[{ Gig_title: { $regex: string1, $options: "$i" }},{Gig_Block:{$ne:'true'}}] })
        .then(async (result) => {
            for (let i = 0; i < result.length; i++) {
                let userid = result[i].Seller_id;
                let userName;

                await UDM.find({ _id: userid })
                    .then((result) => {
                        userName = result[0].User_name;
                        User_pfimg= result[0].User_pfimg;
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
                    'mainuser_id': uid,
                    'User_pfimg':User_pfimg
                });
            }
        })
        .catch((err) => {
            console.log();
        });

    UDM.find({ _id: uid })
        .then((result) => {
            res.render('homepage', { User_name: result[0].User_name, home: 'active', User_id: result[0]._id.toString(), gig_data: gigdata });
        })
        .catch((err) => {
            console.log(err);
        });

    })

module.exports=router;