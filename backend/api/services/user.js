const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');
const app = express();
const { validationResult } = require('express-validator');


app.use(express.json());

module.exports.login = async function login(req, res) {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

   } 

   //Obtenemos los datos del frontend
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
            ok: false,
            err: {
               message: "Usuario o contraseña incorrectos"
            }
         })
      }
      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
         return res.status(400).json({
            ok: false,
            err: {
               message: "Usuario o contraseña incorrectos"
            }
         });
      }
      // Genera el token de autenticación
      let token = jwt.sign({
         usuario: usuarioDB,
      }, process.env.SEED_AUTENTICACION, {
         expiresIn: process.env.CADUCIDAD_TOKEN
      })
      res.json({
         ok: true,
         usuario: usuarioDB,
         token,
      })
   })

};



module.exports.users = async function users(req, res) {
   const usuarios = await Usuario.find().select({ "nombre": 1, "_id": 0 }).limit(5);
   res.json(usuarios);
};


module.exports.registro = async function registro(req, res) {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });

      } 
         let body = req.body;
         let { nombre, nombreUsuario, email, password } = body;
         let usuario = new Usuario({
            nombre,
            nombreUsuario,
            email,
            password: bcrypt.hashSync(password, 10)
         });

         usuario.save();
         return res.sendStatus(200);
      

};

