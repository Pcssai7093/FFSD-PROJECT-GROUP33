const express=module.require('express');
const router=express.Router();
const UDM = module.require('../Userdata/userdatamodel');
const GDM = module.require('../Gigdata/Gigdatamodel');
const TDM = module.require('../transactions/transactionmodel');


router.route('/home')
    .get(async (req,res)=>{
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

router.route('/users')
    .get(async (req,res)=>{
        UDM.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('adminusers', { users: 'active' ,user_data:result});
        })
        .catch((err)=>{
            console.log(err);
        });
    });

router.route('/services')
    .get(async (req,res)=>{

        GDM.find().sort({createdAt:-1})
        .then((result)=>{
        res.render('adminservices', { service_data:result,services: 'active' });
        })
        .catch((err)=>{
        console.log(err);
        })

    });

router.route('/transactions')
    .get(async (req,res)=>{
        TDM.find().sort({updatedAt:-1})
        .then((result)=>{
        res.render('admintransactions', { transactions: 'active',trans_data:result });
        })
        .catch((err)=>{
        console.log(err);
        })
    });

router.route('/userBlock/:uid')
    .post(async (req,res)=>{
        const uid=req.params.uid;
        await UDM.updateOne({_id:uid},{$set:{User_Block:'true'}})
        .then((res)=>{
        console.log('User Blocked');
        })
        .catch((err)=>{
        console.log(err);
        });
        res.redirect('/admin/users');
    });

router.route('/userUnblock/:uid')
    .post(async (req,res)=>{
        const uid=req.params.uid;
        await UDM.updateOne({_id:uid},{$set:{User_Block:'false'}})
        .then((res)=>{
        console.log('User  unBlocked');
        })
        .catch((err)=>{
        console.log(err);
        });
        res.redirect('/admin/users');
    });

router.route('/serviceBlock/:gid')
    .post(async (req,res)=>{
        const gid=req.params.gid;
        await GDM.updateOne({_id:gid},{$set:{Gig_Block:'true'}})
        .then((res)=>{
    
        })
        .catch((err)=>{
            console.log(err);
        });
        res.redirect('/admin/services');
    });

router.route('/serviceUnblock/:gid')
    .post(async (req,res)=>{
        const gid=req.params.gid;
        await GDM.updateOne({_id:gid},{$set:{Gig_Block:'false'}})
        .then((res)=>{
    
        })
        .catch((err)=>{
            console.log(err);
        });
        res.redirect('/admin/services');
    });
module.exports=router;