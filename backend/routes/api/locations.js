const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Location } = require('../../db/models');

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

router.post('/', singleMulterUpload('image'), asyncHandler(async (req, res) => {
    const { userId, name, price, address, city, state, country, description } = req.body;
    const imageUrl = await singlePublicFileUpload(req.file);

    await Location.create({
        userId, name, price, address, city,
        state, country, description, imageUrl
    });

    res.redirect('/');
}));

module.exports = router;
