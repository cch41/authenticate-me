const { Route53Resolver } = require('aws-sdk');
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Location } = require('../../db/models');

router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const bookings = await Booking.findAll({ where: { userId }, include: [Location]});
    return res.json({ bookings });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { guests, checkIn, checkOut, userId, locationId } = req.body;

    try {
        await Booking.create({ guests, checkIn, checkOut, userId, locationId });
        res.json({ message: 'Booking request sent to host!'})
    } catch (err) {
        res.json({ message: err });
    }

}));

router.patch('/:bookingId', asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const { guests, checkIn, checkOut, userId, locationId } = req.body;
    let booking = await Booking.findByPk(bookingId);
    booking.guests = guests;
    booking.checkIn = checkIn;
    booking.checkOut = checkOut;
    booking.locationId = locationId;
    await booking.save();

    res.json({ booking });
}));

router.delete('/:bookingId', asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    await Booking.destroy({ where: { id: bookingId }});
    res.json({});
}));

module.exports = router;
