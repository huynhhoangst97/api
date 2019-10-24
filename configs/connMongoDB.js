const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const urlMongoDB = 'mongodb+srv://sysadmin:sysadmin!!@testapi-df6qy.mongodb.net/testAPI';
mongoose.connect(urlMongoDB,{ useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log("Error : " + err);
    } else {
        console.log("Connected to servers successfully");
    }
});

module.exports= mongoose;