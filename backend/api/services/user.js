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
               message: "Usuario incorrecto"
            }
         })
      }
      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
         return res.status(400).json({
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
      
      console.log(token);

      
      // let session = req.session;
      // console.log(session);

      res.json({
         ok: true,
         usuario: usuarioDB,
         token,
      })
   })

};

module.exports.logout = async function logout(req, res) {

   req.session.destroy();
   res.redirect('/login');


}


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
         Lista.create({nombre: "Programas vistos", usuario: usuario._id, programas: []})
         Lista.create({nombre: "En seguimiento", usuario: usuario._id, programas: []})
         
         return res.sendStatus(200);
      

};


//Listas del usuario
//Validar que un usuario solo accede a sus listas
module.exports.getMisListas = async (req, res) => {
   
   const listas = await Lista.find({usuario: req.user.usuario._id});
   
   res.json(listas);

}

//Validar que un usuario solo accede a su lista
module.exports.getLista = async (req, res) => {


   const lista = await Lista.findById(req.params.idLista);
   console.log(lista.usuario);
   console.log(req.user.usuario._id);

   if(lista.usuario == req.user.usuario._id){
      res.json(lista);
   } else {
      res.sendStatus(401);
   }
   
}


module.exports.createLista = async (req, res) => {

   console.log(req.user);

   const lista = new Lista({nombre: req.body.nombre, programas: [], usuario: req.user.usuario._id});
   await lista.save();

   res.json({
      ok: true,
  })


}
