'use-strict'

const {
  createNewClientService,
  findClientByEmailService,
  getCleintByIdService,
  listClientsService,
  updateClientService
} = require('../services/clients.service')

exports.createNewClientController = async (req, res) => {
  try {
    const clientCreated = await createNewClientService(req.body).catch((_error) => {
      throw _error
    })
    res.status(201).json({
      ok: true,
      data: {
        id: clientCreated._id
      },
      message: 'Cliente creado satisfactoriamente.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.listClientsController = (req, res) => {
  try {
    let { limit, page } = req.query
    limit = limit && limit <= 100 ? parseInt(limit) : 10
    page = page && Number.isInteger(page) ? parseInt(page) : 0

    const USERS = await listClientsService().catch((_error) => {
      throw _error
    })

    res.status(201).json({
      ok: true,
      data: USERS,
      message: 'Listado de clientes.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.getClientByIdController = (req, res) => {
  try {
    const { idClient } = req.params
    const USER = await getCleintByIdService(idClient).catch((_error) => {
      throw _error
    })

    if (!USER) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'Cliente no encontrado o no existe.'
      })
    }
    res.status(200).json({
      ok: true,
      data: USER,
      message: 'Detalle del cliente.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.UpdateClientController = async (req, res) => {
  try {
    const { idClient } = req.params
    if (req.body.password) {
      //hash Password
      req.body.password = await bcrypt.hashSync(req.body.password, 10).catch((_error) => {
        throw _error
      })
    }
    const CLIENT_UPDATED = await updateClientService(idClient, req.body).catch((_error) => {
      throw _error
    })
    if (!CLIENT_UPDATED) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'Cliente no encontrado.'
      })
    }
    res.status(200).json({
      ok: true,
      data: {
        id: CLIENT_UPDATED._id
      },
      message: 'Cliente actualizado.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}

exports.deleteClientController = (req, res) => {
  try {
    const { idClient } = req.params

    let status = {
      status: false
    }
    const CLIENT_UPDATED = await updateClientService(idClient, status).catch((_error) => {
      throw _error
    })
    if (!CLIENT_UPDATED) {
      return res.status(404).json({
        ok: false,
        data: null,
        message: 'Cliente no encontrado.'
      })
    }
    res.status(200).json({
      ok: true,
      data: {
        id: CLIENT_UPDATED._id
      },
      message: 'Cliente actualizado.'
    })
  } catch (_error) {
    console.log(_error)
    res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error grave'
    })
  }
}
