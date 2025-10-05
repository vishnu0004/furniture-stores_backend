const express = require('express');
const router = express.Router();

const {
    userLogin,
    userSignup,
    GetProducts,
    search,
    getproductbyid,
    contactus,
    refreshAccessToken,
    gettrproducts,
    gettrcategories,
    getcatproducts,
    
} = require('./user.controller');

const { verifyToken } = require('../middleware/auth');

router.get('/login', userLogin);
router.get('/getproductbyid', getproductbyid);

router.post('/signup', userSignup);
router.post('/getcatproducts', getcatproducts);

router.post('/search', search);
router.post('/signup', userSignup);
router.post('/gettrcategories', gettrcategories);

router.post('/gettrproducts', gettrproducts);

router.post('/contactus', contactus);

router.get('/getproducts', GetProducts);
router.post('/refreshToken', refreshAccessToken); // ✅ New route

module.exports = router;
