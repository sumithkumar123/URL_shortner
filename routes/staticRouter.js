const express = require("express");
const router=express.Router();
const urls = require('../models/url');
const { handleUserSignup, handleUserLogin } = require("../controllers/user1");
const { restrictTo } = require("../middlewares/auth");

router.get('/admin/urls',restrictTo(["ADMIN"]),async (req,res) => {
    // if(!req.user)   return res.render('login');
    const allurls=await urls.find({});
    return res.render('home', {
        users:allurls
    });
})


router.get("/signup",(req,res) => {
    return res.render("signup");
})
router.get("/login",(req,res) => {
    return res.render("login");
})

router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);

module.exports=router;