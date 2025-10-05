
const jwt = require('jsonwebtoken');

const {
    userLogin,
     userSignup,
     GetProducts,
     search,
     getproductbyid,
     contactus,
     gettrproducts,
     gettrcategories,
     getcatproducts
    } = require('./user.service');

const { generateAccessToken, generateRefreshToken } = require('../middleware/auth');

const refreshAccessToken = (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is missing' });
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret-key';
    const accessSecret = process.env.JWT_SECRET || 'access-secret-key';

    jwt.verify(refreshToken, refreshSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        const newAccessToken = jwt.sign({ id: decoded.id }, accessSecret, {
            expiresIn: '15m',
        });

        // OPTIONAL: Also rotate the refresh token (good security practice)
        const newRefreshToken = jwt.sign({ id: decoded.id }, refreshSecret, {
            expiresIn: '7d',
        });

        return res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken // Optional: Only send if rotating
        });
    });
};

module.exports = {
    refreshAccessToken ,
    getcatproducts : async (req, res) => {
     // console.log('Received song data:', req);

     getcatproducts(req,(err, user) => {
       if (err) {
         return res.json({
            success: false,
            message: err.message,
            data: []
            });
       }else{
            return res.json({
                success: true,
                message:'',
                data: user
            });
       }
     });

},
         gettrproducts : async (req, res) => {
     // console.log('Received song data:', req);

     gettrproducts(req,(err, user) => {
       if (err) {
         return res.json({
            success: false,
            message: err.message,
            data: []
            });
       }else{
            return res.json({
                success: true,
                message:'',
                data: user
            });
       }
     });

},

 gettrcategories : async (req, res) => {
     // console.log('Received song data:', req);

     gettrcategories(req,(err, user) => {
       if (err) {
         return res.json({
            success: false,
            message: err.message,
            data: []
            });
       }else{
            return res.json({
                success: true,
                message:'',
                data: user
            });
       }
     });

},

     GetProducts : async (req, res) => {
     // console.log('Received song data:', req);

     GetProducts(req,(err, user) => {
       if (err) {
         return res.json({
            success: false,
            message: err.message,
            data: []
            });
       }else{
            return res.json({
                success: true,
                message:'',
                data: user
            });
       }
     });

},
     contactus : async (req, res) => {
     // console.log('Received song data:', req);

     contactus(req,(err, user) => {
       if (err) {
         return res.json({
            success: false,
            message: err.message,
            data: []
            });
       }else{
            return res.json({
                success: true,
                message:'',
                data: user
            });
       }
     });

},
     getproductbyid : async (req, res) => {
     // console.log('Received song data:', req);

     getproductbyid(req,(err, user) => {
       if (err) {
         return res.json({
            success: false,
            message: err.message,
            data: []
            });
       }else{
            return res.json({
                success: true,
                message:'',
                data: user
            });
       }
     });

},
     search : async (req, res) => {

     search(req,(err, user) => {
       if (err) {
         return res.json({
            success: false,
            message: err.message,
            data: []
            });
       }else{
            return res.json({
                success: true,
                message:'',
                data: user
            });
       }
     });

},
userLogin : (req, res) => {
    const { username, password } = req.body;

    userLogin(username, password, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message,
                data: []
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.json({
            success: true,
            message: 'Login successful',
            data: {
                user,
                accessToken,
                refreshToken
            }
        });
    });
},



userSignup : async (req, res) => {
    userSignup(req.body, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message,
                data: []
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.json({
            success: true,
            message: 'Signup successful',
            data: {
                user,
                accessToken,
                refreshToken
            }
        });
    });
}

};