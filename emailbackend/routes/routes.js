const express = require('express');
const router = express.Router();
const Model = require('../module/module');
const nodemailer = require("nodemailer");


router.post('/mailsend',async(req,res)=>{
    const { name } = req.body.name; 
    const {email} = req.body.email;
    const {sub} = req.body.subject;
    const {message} = req.body.message;

    console.log(name,email,sub,message)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'princsingh12@gmail.com',
            pass: 'sxktscjhjzbpizmn' // here paste the app password......
        }
    });
    
    // Config
    const mailOption = {
        from: 'princsingh12@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        html: `
        <p>Dear ${req.body.name},</p>
        <p>${req.body.message}</p>
    `
    };

    const newPost = new Model(
        {
            to:mailOption.to,
            subject:mailOption.subject,
            body:mailOption.html
        }
    )


    // Send 
    try {
        const result = await transporter.sendMail(mailOption);
        console.log("Mail sent successfully✅");
        await newPost.save();
        // res.status(200).json(ans);
        res.send("Mail Sent");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error sending mail");
    }
})




//GET All Post
router.get('/getmail', async (req,res)=>{
    try {
        const result = await Model.find();
        res.status(200).json(result);
    } catch (error) {
    res.status(500).json(error);
    }
})




module.exports = router;