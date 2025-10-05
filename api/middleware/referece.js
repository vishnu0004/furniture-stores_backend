const jwt = require('jsonwebtoken');

const refreshToken = (req, res) => {
    const token = req.body.refreshToken;

    if (!token) {
        return res.status(403).json({ message: 'Refresh token is missing' });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });

        res.json({ accessToken });
    });
};

module.exports = { refreshToken };
