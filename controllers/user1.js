const users=require("../models/user");
const {v4:uuid} =require('uuid');
const { setUser } = require("../service/auth");

async function handleUserSignup(req,res) {
    const {name,email,role,password}=req.body;
    console.log(name,email,role,password);
    const user=await users.findOne({email});
    if(user) {
        return res.redirect('/signup');
    }   
    
    await users.create({
        name,
        email,
        role,
        password
    })
    console.log("created");
    return res.redirect('/login');
}
async function handleUserLogin(req,res) {
    const {email,password}=req.body;
    console.log(email,password);
    const user=await users.findOne({
        email,
        password
    })
    if(!user)   return res.render('login');
    // const sessionId=uuid();
    // setUser(sessionId,user);
    const token=setUser(user);
    // res.cookie('uid',token);
    console.log(token);
    res.cookie('token',token);
    // res.json({token});
    return res.redirect('/api/users');
}

module.exports={handleUserSignup, handleUserLogin};


// async function handleUserLogin(req,res) {
//     const {email,password}=req.body;
//     console.log(email,password);
//     const user=await users.findOne({
//         email,
//         password
//     })
//     if(!user)   return res.render('login');
//     // const sessionId=uuid();
//     // setUser(sessionId,user);
//     const token=setUser(user);
//     res.cookie('uid',token);
//     console.log(token);
//     // res.cookie('uid',sessionId);
//     res.redirect('/api/users');
// }
