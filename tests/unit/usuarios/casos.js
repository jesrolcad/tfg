const moment = require('moment');

const casosDeleteValidationLogin = [
    {
        key: "CASO USUARIOINCORRECTO TRUE",
        usuarioIncorrecto: true,
        mensaje: "Usuario y/o contraseña incorrectos",
    },

    {
        key: "CASO USUARIOINCORRECTO FALSE",
        usuarioIncorrecto: false,
        mensaje: "",
    }
]

const casosNegativosLoginSubmit = [
    {
        key: "FORMULARIO VACÍO",
        nombreUsuario: "",
        password: "",
        numMensajesValidacion: 2
    },

    {
        key: "USUARIO VACÍO",
        nombreUsuario: "",
        password: "randomPassword",
        numMensajesValidacion: 1
    },

    {
        key: "CONTRASEÑA VACÍA",
        nombreUsuario: "randomUser",
        password: "",
        numMensajesValidacion: 1
    }
]

const casosDeleteValidationRegistro = [

    {
        key: "NO HAY ERRORES",
        errors: []
    },

    {
        key: "HAY ERRORES",
        errors: [
            {
                param: 'nombreUsuario',
                msg: "error1"
            
            },

            {
                param: 'nombreUsuario',
                msg: 'error2'
            }
            ]
    }
]

//FECHA PARA EL REGISTRO
const fechaActual = moment().locale('es');

//get date minus 16 years from fechaActual
const fechaNacimientoMinima = moment(fechaActual).subtract(16, 'years').format('YYYY-MM-DD');

// //get date minus 1 day from fechaActual
// const fechaNacimientoFalta1Dia = moment(fechaActual).subtract(1, 'days').format('YYYY-MM-DD');

// //get date plus 1 day from fechaActual
// const fechaNacimientoFutura = moment(fechaActual).add(1, 'days').format('YYYY-MM-DD');

const casosPositivosSubmitRegistro = [
    {
        key: "CASO 1: NOMBRE 5 CARACTERES, NOMBREUSUARIO 5 CARACTERES, PASSWORD 8 CARACTERES",
        nombre: "abcde",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuar",
        email: "email1@mail.com",
        password: "12345678"
    },
    {
        key: "CASO 2: NOMBRE 49 CARACTERES, NOMBREUSUARIO 29 CARACTERES",
        nombre: "nombre nombre nombre nombre nombre nombre nombree",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuariousuariousuariousuariou",
        email: "email2@outlook.com",
        password: "abcedfg1"
    },
    {
        key: "CASO 3",
        nombre: "Jesús Roldán Cadena",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioY",
        email: "email3@us.es",
        password: "1234567a"
    },
    {
        key: "CASO 4",
        nombre: "Lucía Torres Gómez",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioZ",
        email: "email4@alum.com",
        password: "qwertyuiop"
    },
    
    {
        key: "CASO 5: EL USUARIO CUMPLE 16 AÑOS EL MISMO DÍA DEL REGISTRO",
        nombre: "Jesús Roldán Cadena",
        fechaNacimiento: fechaNacimientoMinima,
        nombreUsuario: "usuarioW",
        email: "email5@alum.com",
        password: "1234567a"
    }
]

module.exports = {casosDeleteValidationLogin, casosNegativosLoginSubmit, casosDeleteValidationRegistro, casosPositivosSubmitRegistro}