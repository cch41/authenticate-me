const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Tag } = require('../../db/models');


router.get('/', asyncHandler(async (req, res) => {
    const tags = await Tag.findAll();
    res.json({ tags });
}));

module.exports = router;
