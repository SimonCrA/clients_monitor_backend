const User = require('../models/users.model')
const bcrypt = require('bcrypt')

exports.insert = async (req, res) => {
  
  try {
    //hash Password
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const user = new User(req.body)
    const userSaved = await user.save()
    res.status(201).json({
      ok: true,
      user: {
        id: userSaved._id
      }
      })
  } catch (error) {
    console.log(error);
  }
}

exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  User.find()
        .limit(limit)
        .skip(limit * page)
        .exec( (err, usersDB) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err
            })
          }
          res.status(200).json({
            ok: true,
            user: usersDB
          });
        })
}

exports.getById = (req, res) => {
  User.findById({_id: req.params.userId}, (err, userDB) =>{
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        err: "User not found or it's already deleted"
      });
    }
    res.status(200).json({
      ok: true,
      user: userDB
    });
  })
}

exports.patchById = async (req, res) => {
    if (req.body.password) {
      //hash Password
      const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
      req.body.password = hashedPassword
    }
    User.findOneAndUpdate({_id: req.params.userId }, req.body, { useFindAndModify: false }, (err, userUpdated) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
      if (!userUpdated) {
        return res.status(404).json({
          ok: false,
          err: 'User not found or already deleted'
        });
      }
      res.status(200).json({
        ok: true,
        user: {
          id: userUpdated._id
        }
      });
    })

}

exports.disableById = (req, res) => {
  let status = {
    status: false
  }
  User.findByIdAndUpdate(req.params.userId, status, (err, userDeleted) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: 'bad Request'
      });
    }
    if (!userDeleted) {
      return res.status(404).json({
        ok: false,
        err: 'User not found or already deleted'
      });
    }
    res.status(200).json({
      ok: true,
      user: {
        id: userDeleted._id,
        message: 'user Disabled'
      }
    });
  })
}

exports.removeById = (req, res) => {
  User.findByIdAndDelete(req.params.userId, (err, userDeleted) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!userDeleted) {
      return res.status(404).json({
        ok: false,
        err: 'User not found or already deleted'
      });
    }
    res.status(200).json({
      ok: true,
      user: {
        id: userDeleted._id,
        message: 'user Deleted'
      }
    });
  })
}
