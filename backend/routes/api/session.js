const express = require('express');
const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


router.get('/', restoreUser, (req, res) => {
    // why do we access it from the req and not the req.body?
    const { user } = req

    if (user) {
        // why don't we have to await this?
        return res.json({ user: user.toSafeObject() });
    } else {
        return res.json({});
    }
});

router.post('/', asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Login failed');
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid'];
        err.status = 401;
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({ user });
}));

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
})

module.exports = router;
