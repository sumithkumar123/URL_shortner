const express = require("express");
const connecttodb = require("./connect");
const app = express();
const router = require("./routes/user");
const path=require("path");
const staticRoute=require("./routes/staticRouter");
// const userRoute=require('./routes/user1');
const cookieParser=require('cookie-parser');
const {  checkForAuthentication, restrictTo } = require("./middlewares/auth");


connecttodb("mongodb+srv://sumith95738:sumith123@backend.mcusq4r.mongodb.net/urlShortner");
app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);


app.use('/',staticRoute);
app.use('/api/users',router);
// app.use('/api/users',restrictTo(["ADMIN"]) ,router);
// app.use('/api/users1', userRoute);

app.listen(8000, () => {
    console.log("Server started at 8000 port");
})



// app.use('/api/users',restrictToLoggedinUserOnly ,router);

// app.use('/',checkAuth,staticRoute);


// app.get('/test',async (req,res)=> {
//     const users=await urls.find({});
//     res.render("home", {
//         allurls:users
//     });
// })
   // res.send(`
    // <html>
    // <head></head>
    // <body>
    // <ol>
    //     ${users.map(
    //         (user)=> 
    //         `<li>${user.shortId}  -  ${user.originalURL}  -  ${user.visits.length}</li>`).join("")}
    // </ol>
    // </body>
    // </html>`)

    // app.use(function (err, req, res, next) {
    //     console.log(req, "req", res, "res", err, "err")
    // });