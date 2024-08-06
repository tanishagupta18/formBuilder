const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  // if (req.secure || req.headers['x-forwarded-proto'] === 'https')
  //   cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  //Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));
  const user = await User.findOne({ email }).select('+password');
  //const correct = await User.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email and password', 401));
  }
  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //Getting token and check out of its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in. Please login to get access...', 401)
    );
  }
  //Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user still exits
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError('The user belonging to this token does not exists', 401)
    );
  //check if user changed the password after the token was issued
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please login again', 401)
    );
  }
  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});


//Only for rendered page, no errors
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  //Getting token and check out of its there
  if (req.cookies.jwt) {
    //Verification token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    //check if user still exits
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) return next();
    //check if user changed the password after the token was issued
    if (freshUser.changePasswordAfter(decoded.iat)) {
      return next();
    }
    //There is a logged in user
    res.locals.user = freshUser;
    return next();
  }

  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  } 
  if(req.user.name) user.name = req.user.name
  // if(req.user.email) user.email = req.user.email
  user.password = req.body.password;
  // user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, req, res);
});
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
