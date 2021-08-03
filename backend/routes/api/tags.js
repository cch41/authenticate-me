const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Review } = require("../../db/models");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Tag, LocationTag, Location } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tags = await Tag.findAll();
    res.json({ tags });
  })
);

router.get(
  "/:tagId(\\d+)",
  asyncHandler(async (req, res) => {
    const tagId = req.params.tagId;
    const tags = await Tag.findByPk(tagId, {
      include: [{ model: Location, through: LocationTag }],
    });

    return res.json({ tags });
  })
);

module.exports = router;
