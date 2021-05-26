const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');

router.post('/', asyncHandler(async (req, res) => {
    const { guests, checkIn, checkOut, userId, locationId } = req.body;

    try {
        await Booking.create({ guests, checkIn, checkOut, userId, locationId });
        res.json({ message: 'Booking request sent to host!'})
    } catch (err) {
        res.json({ message: err });
    }

}));

module.exports = router;
