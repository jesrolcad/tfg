const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');
const Lista = require('../../models/Lista');
const app = express();
const { validationResult } = require('express-validator');


app.use(express.json());

module.exports.login = async function login(req, res) {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
   }

   let body = req.body;

   Usuario.findOne({ nombreUsuario: body.nombreUsuario }, (erro, usuarioDB) => {
      if (erro) {
         return res.status(500).json({
            ok: false,
            err: erro
         })
      }
      // Verifica que exista un usuario con el nombre de usuario escrito por el usuario.
      if (!usuarioDB) {
         return res.status(400).json({
            status: 400,
            ok: false,
            err: {
               message: "Usuario incorrecto"
            }
         })
      }
      //Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
         return res.status(400).json({
            status: 400,
            ok: false,
            err: {
               message: "Contraseña incorrecta"
            }
         });
      }
      // Genera el token de autenticación
      let token = jwt.sign({
         usuario: usuarioDB
      },
         process.env.SEED_AUTENTICACION, //Este es nuestro token de autenticación
         {
            expiresIn: process.env.CADUCIDAD_TOKEN
         })

      res.json({ status: 200, token: token, role: usuarioDB.roles });

   })
};


module.exports.registro = async function registro(req, res) {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });

   }
   let body = req.body;
   let { nombre, fechaNacimiento, nombreUsuario, email, password } = body;
   let usuario = new Usuario({
      nombre,
      fechaNacimiento,
      nombreUsuario,
      email,
      password: bcrypt.hashSync(password, 10)
   });

   await usuario.save();
   await Lista.create({ nombre: "Programas vistos", usuario: usuario._id, programas: [] })
   await Lista.create({ nombre: "En seguimiento", usuario: usuario._id, programas: [] })

   return res.json({ status: 200 });


};

//get my profile
module.exports.perfil = function perfil(req, res) {
   let usuario = req.user;
   console.log(usuario);
   return res.status(200).json({
      usuario: usuario
   });
}

