const express = require('express');
const router = express.Router({mergeParams: true});
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../schemas.js');
const reviews = require('../controllers/reviews');
const { isLoggedIn, validateReview , isReviewAuthor} = require('../middleware.js');




router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;