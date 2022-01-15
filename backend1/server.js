const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const router = require('./routes');


// databse connection

db.connect();

// middle ware
app.use(bodyParser.json({limit : "50mb"}));
app.use(bodyParser.urlencoded({extended : true , limit : "50mb"}));

// cors
app.use((req , res, next) => {
    req.header("Access-Control-Allow-Origin" , "*");
    req.header("Acccess-Control-Allow-Headers" , "*");
    next();
});

//Routes
app.use('/api', router);
 
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*" , (req,res)=> {
    try{
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
    } catch(e) {
        res.send("Oops there is err");
    }
});

app.use(cors());
const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`)
});



