const express = require('express');
const router = express.Router();


router.get('/about',(req,res)=>{
    res.render('about')
})

router.get('/project',(req,res)=>{
    res.render('project')
})

router.get('/contact',(req,res)=>{
    res.render('contact')
})

module.exports = router;
