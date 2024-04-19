const { getUser } = require("../service/auth");


function checkForAuthentication(req,res,next) {
    // const authorizationHeaderValue=req.headers["authorization"];
    // req.user=null;

    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) 
    //     return next();
    // const token=authorizationHeaderValue.split("Bearer ");
    const tokenCookie=req.cookies?.token;
    if(!tokenCookie)  return next();
    const token =tokenCookie;
    const user=getUser(token);
    console.log(user);
    req.user=user;
    return next();
}
function restrictTo(roles) {
    return function(req,res,next) {
        console.log("user is",req.user);
        if(!req.user)   return res.render('login');
        if(!roles.includes(req.user.role))   return res.end('Unauthorized');
        req.user=req.user;
        return next();
    }
}
module.exports={checkForAuthentication, restrictTo};







// async function restrictToLoggedinUserOnly(req,res,next) {
//     const userUid=req.headers["authorization"];
//     console.log("reached");
//     console.log(userUid);
//     if(!userUid)    return res.render('login');
//     const token=userUid.split('Bearer ')[1];
//     const user=getUser(token);
//     if(!user) return res.render('login');
//     console.log("reached end");
//     req.user=user;
//     next();
// }
// async function checkAuth(req, res, next) {

//     next();
// }

// module.exports={restrictToLoggedinUserOnly, checkAuth};


// async function restrictToLoggedinUserOnly(req,res,next) {
//     const userUid=req.cookies?.uid;
//     console.log("reached");
//     console.log(userUid);
//     if(!userUid)    return res.render('login');
//     const user=getUser(userUid);
//     console.log(user);
//     if(!user) return res.render('login');
//     console.log("reached end");
//     req.user=user;
//     next();
// }


// async function checkAuth(req,res,next) {
//     const userUid=req.cookies?.uid;

//     const user=getUser(userUid);
 
//     req.user=user;
//     next();
// }