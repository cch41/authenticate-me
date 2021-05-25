const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Location, LocationTag } = require('../../db/models');

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


router.post('/', singleMulterUpload('image'), asyncHandler(async (req, res) => {
    const { userId, name, tags, price, address, unit, city, state, country, description } = req.body;

    const imageUrl = await singlePublicFileUpload(req.file);

    console.log([userId, name, price, address, unit, city, state, country, description, imageUrl]);

    const location = await Location.create({
        userId, name, price, address, unit, city,
        state, country, description, imageUrl
    });

    tags.forEach(async tag => {
        await LocationTag.create({ tagId: tag.id, locationId: location.id})
    });

    res.redirect('/');
}));

module.exports = router;
