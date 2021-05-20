const jwt = require('jsonwebtoken');
const { jwtConfig, environment } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn)}
    );

    const isProduction = environment === 'production'

    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    });

    return token;
}

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;

    // how does the cb know the error will be the first parameter?
    // why do we return a function instead of putting this in the function?
    return jwt.verify(token, secret, null, async (err, payload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = payload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (err) {
            res.clearCookie('token');

            // why do you always have to tell it to go to the next function?
            return next();
        }

        // why is this line necessary? shouldn't the catch already run if there is no user
        if (!req.user) res.clearCookie('token');

        return next();
    });
};

const requireAuth = [
    restoreUser,
    function (req, res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
]

module.exports = { setTokenCookie, restoreUser, requireAuth };
