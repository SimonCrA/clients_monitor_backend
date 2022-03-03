'use-strict'

const { body, param, query } = require('express-validator')

exports.createUserValidationMiddleware = [
  body('name')
    .notEmpty()
    .withMessage('el nombre no debe estar vacío.')
    .isString()
    .withMessage('el nombre debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.name.trim()
    }),
  body('lastname')
    .notEmpty()
    .withMessage('el apellido no debe estar vacío.')
    .isString()
    .withMessage('el apellido debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.lastname.trim()
    }),
  body('email')
    .notEmpty()
    .withMessage('el correo no debe estar vacío.')
    .isString()
    .withMessage('el correo debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.email.trim()
    })
    .isEmail()
    .withMessage('el correo debe ser un correo electronico válido.'),
  body('password')
    .notEmpty()
    .withMessage('La clave no debe estar vacío.')
    .isString()
    .withMessage('La clave debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.password.trim()
    }),
  body('role')
    .optional()
    .notEmpty()
    .withMessage('el rol no debe estar vacío.')
    .isString()
    .withMessage('el rol debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.role.trim()
    })
]

exports.updateUserValidationMiddleware = [
  param('userId')
    .notEmpty()
    .withMessage('el identificador del usuario no debe estar vacío.')
    .isMongoId()
    .withMessage('el identificador debe estar en formato válido.'),
  body('name')
    .optional()
    .notEmpty()
    .withMessage('el nombre no debe estar vacío.')
    .isString()
    .withMessage('el nombre debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.name.trim()
    }),
  body('lastname')
    .optional()
    .notEmpty()
    .withMessage('el apellido no debe estar vacío.')
    .isString()
    .withMessage('el apellido debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.lastname.trim()
    }),
  body('email')
    .optional()
    .notEmpty()
    .withMessage('el correo no debe estar vacío.')
    .isString()
    .withMessage('el correo debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.email.trim()
    })
    .isEmail()
    .withMessage('el correo debe ser un correo electronico válido.'),
  body('password')
    .optional()
    .notEmpty()
    .withMessage('La clave no debe estar vacío.')
    .isString()
    .withMessage('La clave debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.password.trim()
    }),
  body('role')
    .optional()
    .notEmpty()
    .withMessage('el rol no debe estar vacío.')
    .isString()
    .withMessage('el rol debe ser una cadena de caracteres.')
    .toLowerCase()
    .customSanitizer((_value, { req }) => {
      return req.body.role.trim()
    })
]

exports.listUsersValidationMiddleware = [
  query('limit')
    .optional()
    .notEmpty()
    .withMessage('El límite no puede estar vacío.')
    .isLength({ min: 1, max: 2 })
    .withMessage('La cantidad máxima de registros por consulta son 99')
    .isNumeric()
    .withMessage('el límite debe ser numérico.'),
  query('page')
    .optional()
    .notEmpty()
    .withMessage('La página no puede estar vacío.')
    .isLength({ min: 1, max: 3 })
    .withMessage('La cantidad máxima de páginas son 999')
    .isNumeric()
    .withMessage('La págia debe ser numérico.')
]

exports.checkIdUserValidationMiddleware = [
  param('userId').notEmpty().withMessage('El límite no puede estar vacío.').isMongoId().withMessage('el identificador debe estar en formato válido.')
]
