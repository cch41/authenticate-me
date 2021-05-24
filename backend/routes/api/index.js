const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const locationsRouter = require('./locations');
const tagsRouter = require('./tags');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/locations', locationsRouter);
router.use('/tags', tagsRouter);




module.exports = router;
