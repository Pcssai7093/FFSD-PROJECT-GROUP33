const express=module.require('express');
const router=express.Router();
const UDM = module.require('../Userdata/userdatamodel');
const GDM = module.require('../Gigdata/Gigdatamodel');
const TDM = module.require('../transactions/transactionmodel');

router.route('/:id')
    .get(async (req,res)=>{
        const uid = req.params.id;
        UDM.find({ _id: uid })
        .then((result) => {
            res.render('postgig', { User_name: result[0].User_name, User_id: result[0]._id.toString(), profile: 'active' });
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .post(async (req,res)=>{
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

module.exports=router;