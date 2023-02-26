const mongoose = require("mongoose");


mongoose.set('strictQuery', false);

const dbConnect = () =>{
    mongoose.connect(process.env.MONGO_URL, {
        // useuNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        ()=> console.log("connect successfully"),
        (error)=> console.log(error)
    )
}


module.exports= dbConnect;