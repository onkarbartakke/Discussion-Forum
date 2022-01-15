const mongoose = require("mongoose");

const url =
  "mongodb://onkar-discussion-forum-admin:jKqrwZSXzXLHGYqy@cluster0-shard-00-00.9xqye.mongodb.net:27017,cluster0-shard-00-01.9xqye.mongodb.net:27017,cluster0-shard-00-02.9xqye.mongodb.net:27017/discussion-forum?ssl=true&replicaSet=atlas-12yroj-shard-0&authSource=admin&retryWrites=true&w=majority";


module.exports.connect = () => {
    mongoose.connect(url , {
        useNewUrlParser : true,
        useUnifiedTopology : true

    }).then(()=>{
        console.log('Monogodb connected Successfully');

    }).catch((error) => console.log("Error : "+ error));

};