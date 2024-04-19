const urls=require('../models/url');
const shortid=require("shortid");

async function handleGenerateNewShortUrl(req,res) {
    const body=req.body;
    let s=body?.originalURL.slice(0,7);
    let r=body?.originalURL.slice(0,8);
    //const check=await urls.findOne({originalURL:body.originalURL}); // to not repeat to create new object 
                                                             // with already exixiting url
    if(s==`http://` || r==`https://` ) {
        const shortID=shortid();
        const users=await urls.create({
            shortId:shortID,
            originalURL:body.originalURL,
            visits:[],
            createdBy:req.user._id,
        })
        console.log(users);
        res.render('home',{
            id:shortID,
            userEmail:req.user.email,
            userRole:req.user.role
        })
    }
    else 
    return res.status(400).json({error:"URL not found or not given in required format(https://...com/)"});
    // if(check)   return res.status.json({error:"Already shortId created for given URL"})
   
}
async function handleShortUrl(req,res) {
    const shortId = req.params.shortId;
    console.log("shortId", shortId);
    const entry = await urls.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visits: [{ timestamp: Date.now() }],
        },
    })
    // console.log("entry");
    // console.log("entry", entry);
    console.log(entry?.originalURL);
    if (entry && entry.originalURL) {
        console.log("redirect")
        // res.send(entry.originalURL);
        res.redirect(entry.originalURL);
    } else {
        // Handle case where entry is null or redirectedURL is not found
        res.send("not found")
    }
};

async function handleVisitHistory(req,res) {
    const shortId=req.params.shortId;
    console.log(shortId);
    console.log({shortId})
    const result=await urls.findOne({shortId});
    res.json({totalClicks:result.visits.length,
                        visitHistory:result.visits});
}

module.exports={handleGenerateNewShortUrl, handleShortUrl, handleVisitHistory};



// async function handleRemoveURL(req,res) {
//     const url= req.params.url;
//     console.log("url", url);
//     const entry = await urls.findAndDelete({originalURL:url});
//     // console.log("entry");
//     console.log("entry", entry);
    
// };