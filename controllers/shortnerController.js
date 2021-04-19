const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const Shortner = require('../models/shortnerModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const baseUrl = process.env.BASEURL + ':' + process.env.PORT;

exports.createUrl = catchAsync(async (req, res, next) => {
  const { initialUrl } = req.body; // destructure the initialUrl from req.body.initialUrl

  // check base url if url is valid
  if (!validUrl.isUri(baseUrl)) {
    next(new AppError('Invalid base URL', 400));
  }

  // if valid, we create the url code
  const urlCode = nanoid(10);

  // check initial url if valid using the validUrl.isUri method
  if (validUrl.isUri(initialUrl)) {
    //we check if the initial URL was in the DB ,else we create it.
    let url = await Shortner.findOne({
      initialUrl,
    });

    // url exist and return the respose
    if (url) {
      res.json(url);
    } else {
      // join the generated short code the the base url
      const shortUrl = baseUrl + '/' + urlCode;

      // saving to the DB
      url = new Shortner({
        initialUrl,
        shortUrl,
        urlCode,
      });
      await url.save();
      res.json(url);
    }
  } else {
    return new AppError('Invalid InitialUrl', 400);
  }
  res.status(201).json({
    status: 'success',
    data: {
      data: url,
    },
  });
});

exports.redirect = catchAsync(async (req, res) => {
  // find a document match to the code in req.params.code
  const url = await Shortner.findOne({
    urlCode: req.params.code,
  });
  if (url) {
    // when valid we perform a redirect
    return res.redirect(url.initialUrl);
  } else {
    // else return a not found 404 status
    return new AppError('Invalid InitialUrl', 400);
  }
});
