const jwt=require("jsonwebtoken")

const Auth= async (req,res,next)=>{
    const token=req.cookies.jwt
    console.log("auth fired");
    if(!token){
        console.log("please sign in token error");
        // res.redirect('/');
        res.send("please sign in")
        // next();
    }
    else{
    jwt.verify(token,process.env.jwt_code,(err,token_data)=>{
        if(err){
            console.log("please sign in token data error");
            res.redirect('/')
            next();
        }
        else{
            console.log(token_data);
            console.log("Auth fired");
            next();
        }
    });
}
   
}

function f1(){
console.log("f1 fired");
}
module.exports=Auth
