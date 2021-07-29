const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const fetch = require("node-fetch");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Location,
  LocationTag,
  Review,
  Booking,
  User,
} = require("../../db/models");

const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// add image check
const validateLocationNew = [
  check("name")
    .exists()
    .withMessage("Please provide a name")
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters")
    .isLength({ max: 50 })
    .withMessage("Name must be 50 characters or less"),
  check("price")
    .exists()
    .withMessage("Please provide a price")
    .isInt({ min: 0 })
    .withMessage("Price must be greater than 0"),
  check("address").exists().withMessage("Please provide a address"),
  check("city").exists().withMessage("Please provide a city"),
  check("state").exists().withMessage("Please provide a state"),
  check("country").exists().withMessage("Please provide a country"),
  check("zipcode")
    .exists()
    .withMessage("Please provide a ZIP Code")
    .isInt({ min: 0 })
    .withMessage("ZIP Code must be valid"),
  check("description")
    .exists()
    .withMessage("Please provide a description")
    .isLength({ min: 50, max: 1000 })
    .withMessage("Description must be between 50 and 1000 characters"),
  handleValidationErrors,
];

router.post(
  "/",
  singleMulterUpload("image"),
  validateLocationNew,
  asyncHandler(async (req, res) => {
    let {
      userId,
      name,
      tags,
      price,
      address,
      unit,
      city,
      state,
      country,
      zipcode,
      description,
    } = req.body;
    tags = tags.split(",");

    const imageUrl = await singlePublicFileUpload(req.file);
    const newLocation = {
      userId,
      name,
      tags,
      price,
      address,
      city,
      state,
      country,
      zipcode,
      description,
      imageUrl,
    };
    if (unit) {
      newLocation[unit] = unit;
    }

    const location = await Location.create(newLocation);

    if (tags.length > 0) {
      tags.forEach(async (tag) => {
        tag = Number(tag);
        await LocationTag.create({ tagId: tag, locationId: location.id });
      });
    }

    return res.json({ location });
  })
);

router.get(
  "/users/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const locations = await Location.findAll({ where: { userId } });
    res.json({ locations });
  })
);

router.get(
  "/:locationId(\\d+)",
  asyncHandler(async (req, res) => {
    const { locationId } = req.params;
    const location = await Location.findByPk(locationId, {
      include: [{ model: Review, include: [User] }],
    });

    const weather_api_key = process.env.WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&appid=${weather_api_key}&units=imperial`;
    const weatherData = await fetch(url);
    const weather = await weatherData.json();
    res.json({ location, weather });
  })
);

const validateLocationEdit = [
  check("name")
    .exists()
    .withMessage("Please provide a name")
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters")
    .isLength({ max: 50 })
    .withMessage("Name must be 50 characters or less"),
  check("price")
    .exists()
    .withMessage("Please provide a price")
    .isInt({ min: 0 })
    .withMessage("Price must be greater than 0"),
  check("address").exists().withMessage("Please provide a address"),
  check("city").exists().withMessage("Please provide a city"),
  check("state").exists().withMessage("Please provide a state"),
  check("country").exists().withMessage("Please provide a country"),
  check("zipcode")
    .exists()
    .withMessage("Please provide a ZIP Code")
    .isInt({ min: 0 })
    .withMessage("ZIP Code must be valid"),
  check("description")
    .exists()
    .withMessage("Please provide a description")
    .isLength({ min: 50, max: 1000 })
    .withMessage("Description must be between 50 and 1000 characters"),
  handleValidationErrors,
];

// add image editing and validationhandling
router.patch(
  "/:locationId",
  singleMulterUpload("image"),
  validateLocationNew,
  asyncHandler(async (req, res) => {
    const { locationId } = req.params;
    await LocationTag.destroy({ where: { locationId } });
    console.log("in");
    let {
      name,
      tags,
      price,
      address,
      unit,
      city,
      state,
      country,
      zipcode,
      description,
    } = req.body;
    const location = await Location.findByPk(locationId);

    if (req.file) {
      const imageUrl = await singlePublicFileUpload(req.file);
      location.imageUrl = imageUrl;
    }
    location.name = name;
    location.price = price;
    location.address = address;
    location.unit = unit;
    location.city = city;
    location.state = state;
    location.country = country;
    location.zipcode = zipcode;
    location.description = description;

    await location.save();

    tags = tags.split(",");
    if (tags.length > 0) {
      tags.forEach(async (tag) => {
        tag = Number(tag);
        await LocationTag.create({ tagId: tag, locationId: location.id });
      });
    }

    res.json({ location });
  })
);

router.delete(
  "/:locationId",
  asyncHandler(async (req, res) => {
    const { locationId } = req.params;
    await LocationTag.destroy({ where: { locationId } });
    await Review.destroy({ where: { locationId } });
    await Booking.destroy({ where: { locationId } });
    await Location.destroy({ where: { id: locationId } });

    res.json({});
  })
);

router.post("/:locationId/reviews", (req, res) => {
  const { locationId } = req.params;
  const { content, userId, recommends } = req.body;
  Review.create({ content, userId, locationId, recommends });
});

router.get(
  "/query/:query",
  asyncHandler(async (req, res) => {
    const { query } = req.params;
    const cleanQuery = query.replace("%20", " ");
    const [city, state, country] = cleanQuery.split(",");
    const locations = await Location.findAll({
      where: {
        [Op.and]: [
          { city: { [Op.substring]: city } },
          { state: { [Op.substring]: state } },
          { country: { [Op.substring]: country } },
        ],
      },
    });
    console.log(locations);
    res.json({ locations });
  })
);

module.exports = router;
