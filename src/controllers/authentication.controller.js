require('../config/env.config')
const User = require('../models/users.model')
const { signUpValidation, logInValidation } = require('../middlewares/auth.validation.data')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let refreshTokens = []

exports.signUp = async (req, res) => {
  
  let body = req.body;
  //Validation
  const {error} = await signUpValidation(body)

  if (error) {
    return res.status(400).json({
      ok: false,
      err: error.details[0].message
    })
  }
  // console.log(body);

  //hash Password
  const hashedPassword = await bcrypt.hashSync(body.password, 10)

  //Create the user and generate token
  User.create({
    name: body.name,
    nickname: body.nickname,
    lastname: body.lastname,
    email: body.email,
    address: body.address,
    password: hashedPassword
  },
  function (err, user) {

    if (err) {
      return res.status(500).json({
        ok: false,
        err: err.errors
      })
    }
    //Create access-token
    const accessToken = jwt.sign(
      {
        _id: user._id
      },
      process.env.SEED_AUTH,
      {
        expiresIn: process.env.TOKEN_EXPIRY
      }
    )    
    //Create refresh-token
    const refreshToken = jwt.sign(
      {
        _id: user._id
      },
      process.env.SEED_AUTH_REFRESH
    ) 
    
    refreshTokens.push(refreshToken)

    res.status(201).json({
      ok: true,
      user: user._id,
      access_token: accessToken,
      refresh_token: refreshToken
    });
  })

}

exports.logIn = async (req, res) => {

  let body = req.body;

  //Validation
  const { error } = logInValidation(body)
 
  if (error) {
    return res.status(400).json({
      ok: false,
      err: error.details[0].message
    })
  }

  //Check if the email already exists in the database
  const user = await User.findOne({ email: body.email })
  if (!user) {
    return res.status(401).json({
      ok: false,
      err: "Invalid Email or password!"
    })
  }

  const validPass = await bcrypt.compareSync(body.password, user.password)
  if (!validPass) {
    return res.status(401).json({
      ok: false,
      err: "Invalid Email or password!"
    })
  }
  
  //Create access-token
  const accessToken = jwt.sign(
    {
      _id: user._id
    },
    process.env.SEED_AUTH,
    {
      expiresIn: process.env.TOKEN_EXPIRY
    }
  )    
  //Create refresh-token
  const refreshToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SEED_AUTH_REFRESH
  ) 
  
  refreshTokens.push(refreshToken)
  console.log(refreshTokens)
  res.status(202).json({
    ok: true,
    user: user._id,
    access_token: accessToken,
    refresh_token: refreshToken
  });
} 

exports.tokenRefresh = async (req, res) => {

  const { token } = req.body

  if (!token) {
    return res.status(401).json({
      ok: false,
      err: 'Unauthorized'
    })
  } else if (!refreshTokens.includes(token)) {
    return res.status(403).json({
      ok: false,
      err: 'Forbidden bad token'
    })
  }
  //Compare refresh token on server against refresh token from client
  jwt.verify(token, process.env.SEED_AUTH_REFRESH, (err, user) => {

    if (err) {
      return res.status(403).json({
        ok: false,
        err: 'Forbidden'
      })
    }

    //Create access-token
    const accessToken = jwt.sign(
      {
        _id: user._id
      },
      process.env.SEED_AUTH,
      {
        expiresIn: process.env.TOKEN_EXPIRY
      }
    )
    res.status(202).json({
      ok: true,
      user: user._id,
      access_token: accessToken,
      refresh_token: token
    });

  })

}

exports.logout = async (req, res) => {
  const { token } = req.body
  console.log(req.jwt)
  refreshTokens = await refreshTokens.filter(t => t !== token)
  res.status(200).json({
    ok: true,
    message: 'Logout Successful'
  })
}