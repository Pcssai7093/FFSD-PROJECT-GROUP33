const { render } = require("express/lib/response");

const express = module.require('express');
const app = new express();
const mongoose = module.require('mongoose');
const bodyParser = module.require('body-parser');
let ObjectId = module.require('mongodb').ObjectID;

const dbcon = 'mongodb+srv://Chandra7093:Raja70932md@ffsdproject.iound.mongodb.net/FFSDProject?retryWrites=true&w=majority';
const port=process.env.port ||3000;
mongoose.connect(dbcon)
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
app.use(express.static('Homepage'));
app.use(express.static('Navbar'));
app.use(express.static('Descpage'));
app.use(express.static('Profilepage'));
app.use(express.static('postgigpage'));
app.use(express.static('Signuppage'));
app.use(express.static('Wishlist'));
app.use(express.static('Landingpage'));
app.use(express.static('Adminpage'));
app.use(express.static('Userorders'));
app.use(express.static('Aboutus'));
app.use(express.static('Contactus'));



const UDM = module.require('./Userdata/userdatamodel');
const GDM = module.require('./Gigdata/Gigdatamodel');
const TDM = module.require('./transactions/transactionmodel');


// todo----------------


// todo: parametered routers-------------------

app.get('/home/:id', async (req, res) => {
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

});


// *searching
app.post('/home/search/:id', async (req, res) => {
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

});


// * filters
app.post('/home/:id', async (req, res) => {
    // res.send(req.body);
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


app.get('/profile/:id', async(req, res) => {
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

app.post('/addprofiledetails/:id',async(req,res)=>{
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

app.get('/profile/:id/:id2', async (req, res) => {
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
                console.log('hii1');
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


app.get('/descpage/:id/:id2', async (req, res) => {
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

// todo post user

app.get('/postgig/:id', (req, res) => {
    const uid = req.params.id;
    UDM.find({ _id: uid })
        .then((result) => {
            res.render('postgig', { User_name: result[0].User_name, User_id: result[0]._id.toString(), profile: 'active' });
        })
        .catch((err) => {
            console.log(err);
        });
});

 app.post('/postgig/:id', (req, res) => {
    const uid = req.params.id;

    const gdm = new GDM({
        Gig_title: req.body.gig_title,
        Gig_desc: req.body.gig_description,
        Basic_price: req.body.gig_price_basic,
           Basic_desc: req.body.gig_basic_desc,
        Standard_price: req.body.gig_price_standard,
        Standard_desc: req.body.gig_standard_desc,
        Premium_price: req.body.gig_price_premium,
        Premium_desc: req.body.gig_premium_desc,
        Category: req.body.gig_category,
        Seller_id: uid,
        Gig_tnimg:req.body.img_1,
        Gig_img2:req.body.img_2,
        Gig_img3:req.body.img_3,
        Gig_img4:req.body.img_4,
        Gig_img5:req.body.img_5,
    })

    gdm.save()
        .then((result) => {
            res.redirect('/home/' + uid);
        })
        .catch((err) => {
            console.log(err);
        });
});


app.get('/wishlist/:id', async (req, res) => {

    const uid = req.params.id;
    let gigdata = [];
    let gig_id=[];
    await UDM.find({ _id: uid })
    .then(async (result) => {



    console.log(result[0]._id);
    console.log(result[0].wishlist);

    console.log(typeof(result[0].wishlist));

    // ! why in not working
        for(let i=0;i<result[0].wishlist.length;i++){
            await GDM.find({_id:result[0].wishlist[i]})
            .then(async (result) => {
                console.log(result.length);
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
});


app.post('/wishlist/:id',async (req,res)=>{
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
})

// * created for wishlist gigdelete 
app.post('/wishlistdelete/:id',async (req,res)=>{
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

// todo: signin -------------------
app.get('/', (req, res) => {
    res.render('signin', { er: '' });
});

app.post('/', (req, res) => {
    UDM.find({
        $and: [
            { Email: req.body.Email },
            { User_password: req.body.Password },
            {User_Block:{$ne:'true'}}
        ]
    })
        .then((result) => {
            if (result.length != 1) {
                // console.log(data);
                res.render('signin', { er: 'user data inavalid' });
            }
            else {
                res.redirect('/home/' + result[0]._id.toString());
            }

            // res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// todo: signup --------------------

app.get('/signup', (req, res) => {
    res.render('signup', { er: '' });
});

app.post('/signup', (req, res) => {

    UDM.find({
        $or: [
            { User_name: req.body.User_name },
            { Email: req.body.Email },
            { Mob_number: req.body.Mob_number }
        ]
    }, (err, data) => {
        if (data.length > 0) {
            res.render('signup', { er: 'Error:username/mobile/email not unqiue' });
        }
        else {

            const udm = new UDM({
                First_name: req.body.First_name,
                Last_name: req.body.Last_name,
                Age: req.body.Age,
                User_name: req.body.User_name,
                Email: req.body.Email,
                Mob_number: req.body.Mob_number,
                User_password: req.body.User_password
            })


            udm.save()
                .then((result) => {
                    res.redirect('/home/' + result._id.toString());
                })
                .catch((err) => {
                    console.log(err);
                });

        }

    });

});

app.get('/userorders/:id',async (req,res)=>{
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

app.post('/checkout/:uid/:gid',async (req,res)=>{
    console.log(req.params.uid,req.params.gid);

    const tdm=new TDM({
        userid:req.params.uid,
        gigid:req.params.gid,
        amount:req.body.payamount
    })
    tdm.save()
    .then((result)=>{
        res.redirect('/userorders/'+req.params.uid);
    })
    .catch((err)=>{
        console.log(err);
    });
      
   
});


app.post('/addreview/:uid/:tid',async (req,res)=>{
  await TDM.updateOne({_id:req.params.tid},{$set:{review:req.body.review,rating:req.body.user_rating}})
   .then((res)=>{
    
   })
   .catch((err)=>{
        console.log(err);
   });
   res.redirect('/userorders/'+req.params.uid);
})

app.post('/addreport/:uid/:tid',async(req,res)=>{
    await TDM.updateOne({_id:req.params.tid},{$push:{reports:req.body.report_text}})
   .then((res)=>{
    
   })
   .catch((err)=>{
        console.log(err);
   });
   res.redirect('/userorders/'+req.params.uid);
});

// * admin routes


// app.post('/userdelete/:uid',async (req,res)=>{
//     const uid=req.params.uid;
//    await UDM.updateOne({_id:uid},{$set:{User_Block:'true'}})
//     .then((res)=>{

//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//     res.redirect('/adminusers');
// }); 



app.get('/adminhome', async (req, res) => {
    let user_cnt,service_cnt,trans_cnt;

    await UDM.countDocuments({})
    .then((cnt)=>{
        user_cnt=cnt;
    })
    .catch((err)=>{
        console.log(err);
    });

    await GDM.countDocuments({})
    .then((cnt)=>{
        service_cnt=cnt;
    })
    .catch((err)=>{
        console.log(err);
    });
    
    await TDM.countDocuments({})
    .then((cnt)=>{
        trans_cnt=cnt;
    })
    .catch((err)=>{
        console.log(err);
    });

    res.render('adminhome', { home: 'active',user_cnt:user_cnt,service_cnt:service_cnt,trans_cnt:trans_cnt });
});

app.get('/adminusers', (req, res) => {
    UDM.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('adminusers', { users: 'active' ,user_data:result});
    })
    .catch((err)=>{

    });
});



app.get('/adminservices', (req, res) => {
    GDM.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('adminservices', { service_data:result,services: 'active' });
    })
    .catch((err)=>{
        console.log(err);
    })
   
});

app.get('/admintransactions', (req, res) => {
    TDM.find().sort({updatedAt:-1})
    .then((result)=>{
    res.render('admintransactions', { transactions: 'active',trans_data:result });
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.post('/userdelete/:uid',async (req,res)=>{
    const uid=req.params.uid;
    await UDM.updateOne({_id:uid},{$set:{User_Block:'true'}})
    .then((res)=>{
        console.log('User Blocked');
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect('/adminusers');
});

app.post('/userUnblock/:uid',async (req,res)=>{
    const uid=req.params.uid;
    await UDM.updateOne({_id:uid},{$set:{User_Block:'false'}})
    .then((res)=>{
        console.log('User unblocked');
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect('/adminusers');
});


app.post('/servicedelete/:gid',async (req,res)=>{
    const gid=req.params.gid;
    await GDM.updateOne({_id:gid},{$set:{Gig_Block:'true'}})
    .then((res)=>{

    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect('/adminservices');
});

app.post('/serviceUnblock/:gid',async (req,res)=>{
    const gid=req.params.gid;
    await GDM.updateOne({_id:gid},{$set:{Gig_Block:'false'}})
    .then((res)=>{

    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect('/adminservices');
});

app.get('/aboutus' , (req,res) => {
    res.render('aboutus');
});

app.get('/contactus' , (req,res) => {
    res.render('contactus');
});

app.get('/contactusd' , (req,res) => {
    res.send('<h1>Thanks for contacting us!<h1>');
});



