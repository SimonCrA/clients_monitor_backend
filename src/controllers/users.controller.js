'use-strict'

const { findUserByEmailService, createNewUserService, listUsersService, getUserByIdService, updateUserService } = require('../services/users.service')

exports.createNewUserController = async (req, res) => {
  try {
    const { password } = req.body
    //hash Password
    const hashedPassword = await bcrypt.hashSync(password, 10)
    req.body.password = hashedPassword

    const userCreated = await createNewUserService(req.body).catch((_error) => {
      throw _error
    })
    res.status(201).json({
      ok: true,
      data: {
        id: userCreated._id
      },
      message: 'Usuario creado satisfactoriamente.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.listUsersController = (req, res) => {
  try {
    let { limit, page } = req.query
    limit = limit && limit <= 100 ? parseInt(limit) : 10
    page = page && Number.isInteger(page) ? parseInt(page) : 0

    const USERS = await listUsersService().catch((_error) => {
      throw _error
    })

    res.status(201).json({
      ok: true,
      data: USERS,
      message: 'Listado de usuarios.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.getUserByIdController = (req, res) => {
  try {
    const { idUser } = req.params.idUser
    const USER = await getUserByIdService(idUser).catch((_error) => {
      throw _error
    })

    if (!USER) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'Usuario no encontrado o no existe.'
      })
    }
    res.status(200).json({
      ok: true,
      data: USER,
      message: 'Detalle de usuario.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.UpdateUserController = async (req, res) => {
  try {
    const { idUser } = req.params
    if (req.body.password) {
      //hash Password
      req.body.password = await bcrypt.hashSync(req.body.password, 10).catch((_error) => {
        throw _error
      })
    }
    const USER_UPDATED = await updateUserService(idUser, req.body).catch((_error) => {
      throw _error
    })
    if (!USER_UPDATED) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'Usuario no encontrado.'
      })
    }
    res.status(200).json({
      ok: true,
      data: {
        id: USER_UPDATED._id
      },
      message: 'Usuario actualizado.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.deleteUserController = (req, res) => {
  try {
    const { idUser } = req.params

    let status = {
      status: false
    }
    const USER_UPDATED = await updateUserService(idUser, status).catch((_error) => {
      throw _error
    })
    if (!USER_UPDATED) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'Usuario no encontrado.'
      })
    }
    res.status(200).json({
      ok: true,
      data: {
        id: USER_UPDATED._id
      },
      message: 'Usuario actualizado.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}
