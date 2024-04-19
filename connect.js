const {mongoose } = require("mongoose");

async function connecttodb(url) {
    return mongoose.connect(url)
        .then(()=> console.log("Mongodb connected"))
        .catch(()=> console.log("error connecting"));
}

module.exports=connecttodb;