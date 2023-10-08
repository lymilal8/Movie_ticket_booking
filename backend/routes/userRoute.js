const express = require('express');
const router=express.Router();

const userData = require("../model/signUp");
const jwt=require("jsonwebtoken");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//Login api
router.post("/login",async(req,res)=>{
    let username=req.body.username;
    console.log(username);
    let password=req.body.password;
    console.log(password);
    const user= await userData.findOne({username: username});
    console.log(user); 
    if(!user){
        res.json({message:"user not found"})
    }
    try{
        if(user.password==password){
            jwt.sign({email:username,id:user._id},"ict",{expiresIn:'1d'},
            (error,token)=>{
                if(error){
                  res.json({message:"Token  not generate"})  
                }
                else{
                    res.json({message:"Login sucessfully",token:token,data:user})
                }
            }
                       
        )}
        else
        {
            res.json({message:"Lodin failed"})
        }
    }
    catch(err){
        console.log(err)
    }
});

//signup
router.post("/signup",async(req,res)=>{
    let username = req.body.username;
    console.log(username);
    let password = req.body.password;
    console.log(password);
    const user = await userData.findOne({ username: username });
    console.log(user);
    if (user) {
        res.json({ message: "This Username already in use" });
    } else {
        try {
            const item = req.body;
            const newUser = new userData(item); // Create a new instance of userData
            await newUser.save(); // Save the new user to the database
            res.json({ message: "Signup successfully" }); // Respond with success message
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error occurred while signing up" }); // Respond with an error message
        }
    }
  
});




module.exports=router;