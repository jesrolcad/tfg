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

//get date minus 1 day from fechaActual
const fechaNacimientoFalta1Dia = moment(fechaActual).subtract(1, 'days').format('YYYY-MM-DD');

//get date plus 1 day from fechaActual
const fechaNacimientoFutura = moment(fechaActual).add(1, 'days').format('YYYY-MM-DD');

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

const casosNegativosSubmitRegistro = [

    {
        key: "CASO 1: NOMBRE 4 CARACTERES",
        nombre: "abcd",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuario",
        email: "email1@gmail.com",
        password: "12345678"
    },
    {
        key: "CASO 2: NOMBRE 51 CARACTERES",
        nombre: "nombre nombre nombre nombre nombre nombre nombre no",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuariousuariousuariousuariou",
        email: "email2@gmail.com",
        password: "abcedfg1"
    },
    {
        key: "CASO 3: NOMBRE NÚMEROS",
        nombre: "Jesús Roldán Cadena1",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    },
    {
        key: "CASO 4: NOMBRE VACÍO",
        nombreUsuario: "usuarioB",
        fechaNacimiento: "2000-06-07",
        email: "email4@gmail.com",
        password: "qwertyuiop"
    },
    {
        key: "CASO 5: NOMBRE CON ESPACIOS",
        nombre: " ",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    },
    {
        key: "CASO 6: NOMBREUSUARIO 4 CARACTERES",
        nombre: "nombre",
        nombreUsuario: "usua",
        email: "email3@gmail.com",
        password: "1234567a"
    },
    {
        key: "CASO 7: NOMBREUSUARIO 31 CARACTERES",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuariousuariousuariousuariousu",
        email: "email3@gmail.com",
        "password": "1234567a"
    },
    {
        key: "CASO 8: NOMBREUSUARIO NÚMEROS",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuario12",
        email: "email3@gmail.com",
        password: "1234567a"
    },
    {
        key: "CASO 9: NOMBREUSUARIO VACIO",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        email: "email3@gmail.com",
        password: "1234567a"
    },
    {
        key: "CASO 10: EMAIL FORMATO INCORRECTO",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "estonoesunemail",
        password: "1234567a"
    },
    {
        key: "CASO 11: EMAIL VACÍO",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        password: "1234567a"
    },
    {
        key: "CASO 12: PASSWORD 7 CARACTERES",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567"
    },
    {
        key: "CASO 13: PASSWORD EN BLANCO 8 CARACTERES",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "        "
    },
    {
        key: "Caso 14: PASSWORD VACÍA",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com"
    },

    {
        key: "Caso 15: FECHA DE NACIMIENTO VACÍA",
        nombre: "nombre",
        fechaNacimiento: "",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    },

    {
        key: "Caso 16: CUALQUIER VALOR EN EL CAMPO FECHANACIMIENTO",
        nombre: "nombre",
        fechaNacimiento: "AAAA",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    },

    {
        key: "Caso 17: FECHANACIMIENTO 1 DÍA ANTERIOR A LA MÍNIMA",
        nombre: "nombre",
        fechaNacimiento: fechaNacimientoFalta1Dia,
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    },

    {
        key: "Caso 18: FECHANACIMIENTO FUTURA",
        nombre: "nombre",
        fechaNacimiento: fechaNacimientoFutura,
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    }

]
    

module.exports = {casosDeleteValidationLogin, casosNegativosLoginSubmit, casosDeleteValidationRegistro, casosPositivosSubmitRegistro, casosNegativosSubmitRegistro}