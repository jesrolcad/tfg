const { body } = require('express-validator');
const Usuario = require('../../models/Usuario');
const moment = require('moment');

module.exports.registroSchema = [

  body('nombre').exists({ checkFalsy: true }).withMessage("El nombre es obligatorio").trim().isLength({ min: 5, max: 50 })
    .withMessage("El nombre y apellidos deben tener entre 5 y 50 caracteres").matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/).withMessage("El nombre y apellidos solo deben contener letras"),

  body('nombreUsuario').exists({ checkFalsy: true }).withMessage("El nombre de usuario es obligatorio")
    .isAlpha().withMessage("El nombre de usuario solo puede contener letras")
    .isLength({ min: 5, max: 30 }).withMessage("El nombre de usuario debe contener entre 5 y 30 caracteres")
    .custom(async value => {
      const user = await Usuario.findOne({ nombreUsuario: value });
      if (user) {
        return Promise.reject("Nombre de usuario en uso");
      }
    }),

  body('email').isEmail().withMessage("No sigue el formato adecuado").custom(async value => {
    return Usuario.findOne({ email: value }).then(user => {
      if (user) {
        return Promise.reject('Correo electrónico en uso');
      }
    })
  }),

  body('password').exists({ checkFalsy: true }).withMessage("La contraseña es obligatoria").isLength({ min: 8 }).withMessage("La contraseña debe tener como mínimo 8 caracteres")
    .matches(/[a-zA-Z0-9]{8,}/).withMessage("La contraseña solo puede contener letras y/o números"),

  //check that fechaNacimiento is a date
  body('fechaNacimiento').exists({ checkFalsy: true }).withMessage("La fecha de nacimiento es obligatoria").isISO8601().withMessage("La fecha de nacimiento debe ser una fecha válida")
  .custom(async value => {
    let fechaNacimiento = new Date(value);
    if (fechaNacimiento > Date.now()) {
      return Promise.reject("La fecha de nacimiento no puede ser posterior a la fecha actual");
    }
  })
    .custom(async value => {
      let fechaNacimiento = moment(value);
      let fechaActual = moment();

      let edad = fechaActual.diff(fechaNacimiento, 'years');
      console.log(edad);

      if (edad < 16) {
        return Promise.reject("Debes tener 16 años o más para usar la aplicación");
      }
    })
]