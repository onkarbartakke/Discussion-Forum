const express = require('express');
const router = express.Router();

const questionDB = require('../models/Question');

router.post('/' , async (req,res) =>{
    console.log(req.body);

    try{
        await questionDB.create({
            questionName : req.body.questionName,
            questionUrl : req.body.questionUrl

        }).then(()=>{
            res.status(201).send({
                status : true,
                message : "Question added in DB"
            });

        }).catch((err)=> {
            res.status(400).send({
                status : false,
                message : "Format is incorrect"
            });
        });
    } catch(e) {
        res.status(500).send({
            status : false,
            message : "Error while adding question"
        });
    }
});

router.get('/' , async(req,res)=> {
    
    try{
        await questionDB.aggregate([{
            $lookup : {
                from : "answers", //collection to join
                localField : "_id", // field from input doc
                foreignField : "questionId",
                as : "allAnswers" 
            }
        }]).exec().then((doc) => {
            res.status(200).send(doc)
        }).catch((error)=>{
            res.status(500).send({
                stauts : false,
                message : "Unable to get the question details"
            })
        })
    } catch(e){
        res.status(500).send({
            stauts : false,
            message : "Unexpected error"
        })
    }
})

module.exports = router;