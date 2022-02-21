'use-strict'

const { body, param, query } = require('express-validator')

exports.logInValidationMiddleware = [
  body('email')
    .notEmpty()
    .withMessage('el correo no debe estar vacío.')
    .isString()
    .withMessage('el correo debe ser una cadena de caracteres.')
    .toLowerCase()
    .trim()
    .isEmail()
    .withMessage('el correo debe estar en un formato válido.'),
  body('password')
    .notEmpty()
    .withMessage('La clave no debe estar vacío.')
    .toLowerCase()
    .trim()
    .isAlphanumeric()
    .withMessage('La clave debe ser una cadena de caracteres con números.')
]

exports.signUpValidationMiddleware = [
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
