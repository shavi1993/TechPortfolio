const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('login', {  });
});

router.get('/signup',(req,res)=>{
    res.render('signup',{ message: null })
})

router.post('/signup', register);
router.post('/login', login);

module.exports = router;
