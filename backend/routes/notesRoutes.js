const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/userAuth');
const Notes = require('../models/notes');
//Get All notes of a User
router.get('/',verifyUser,async (req,res)=>
{
    const response = await Notes.find({user : req.id});
    if(!response)
    return res.status(400).json({"error" : "No notes to show"});
    res.status(200).json(response);
})

//Add a New Note
router.post('/',verifyUser,async (req,res)=>
{
    try{
        const newNote = await new Notes({
            user : req.id,
            title : req.body.title,
            description : req.body.description,
            tag : req.body.tag
         })
        const response =  await newNote.save();
         res.status(200).json(response);
    }catch(err){
        console.log(err.message)
        res.status(500).json({"error" : "Some error occured"});
    }
   
})


router.put('/:id',verifyUser,async (req,res)=>
{
    try{
        const noteId = req.params.id;
        const {title,description,tag} = req.body;
        const response = await Notes.findByIdAndUpdate({_id:noteId},{title,description,tag},{new : true});
        console.log(response);
        res.status(200).json(response);
    }catch(err)
    {
        console.log(err.message);
        res.status(500).json({"Error" : "Some Error Occured"});
    }
})

router.delete('/:id',verifyUser,async (req,res)=>
{
    try{
        const noteId = req.params.id;
        const {title,description,tag} = req.body;
        const response = await Notes.findByIdAndDelete({_id:noteId});
        console.log(response);
        res.status(200).json(response);
    }catch(err)
    {
        console.log(err.message);
        res.status(500).json({"Error" : "Some Error Occured"});
    }
})
module.exports = router;