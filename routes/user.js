const express = require("express");
const urls = require("../models/url");
const { handleGenerateNewShortUrl, handleShortUrl, handleVisitHistory } = require("../controllers/user");
const { restrictTo } = require("../middlewares/auth");


const router = express.Router();



router.get('/',restrictTo(["NORMAL","ADMIN"]),async (req,res) => {
    // if(!req.user)   return res.render('login');
    if(req.user.role=="NORMAL") {
        const allurls=await urls.find({createdBy: req.user._id});
        return res.render('home', {
            users:allurls,
            userEmail:req.user.email,
            userRole:req.user.role
        });
    }
    if(req.user.role=="ADMIN") {
        const allurls=await urls.find({});
        return res.render('home', {
        users:allurls,
        userEmail:req.user.email,
        userRole:req.user.role
     });
    }
    // if(!req.user)   return res.render('login');
    
})


// Route to handle generating new short URL
router.route('/').post(handleGenerateNewShortUrl);

router.route('/:shortId').get(handleShortUrl);
// router.route('/:url').delete(handleRemoveURL);

router.route('/analytics/:shortId').get(handleVisitHistory);
module.exports = router;

// router.get('/',restrictTo(["NORMAL"]),async (req,res) => {
//     // if(!req.user)   return res.render('login');
//     const allurls=await urls.find({createdBy: req.user._id});
//     return res.render('home', {
//         users:allurls
//     });
// })
// router.get('/',restrictTo(["ADMIN"]),async (req,res) => {
//     // if(!req.user)   return res.render('login');
//     const allurls=await urls.find({});
//     return res.render('home', {
//         users:allurls
//     });
// })




// const logResponse = (req, res, next) => {
//     const originalSend = res.send;
//     console.log("logResponse")
//     res.send = function (data) {
//         console.log("Response:", data); // Logging the response
//         originalSend.apply(res, arguments);
//     };
//     next();
// };
