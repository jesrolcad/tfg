const moment = require('moment');

//LOGIN
const casosNegativosLogin = [{ key: 'USUARIO Y CONTRASEÑA VACIOS', nombreUsuario: '', password: '' },
{ key: 'CONTRASEÑA VACIA', nombreUsuario: 'userTest', password: '' },
{ key: 'USUARIO VACIO', nombreUsuario: '', password: '12345678' },
{ key: 'CONTRASEÑA ERRONEA', nombreUsuario: 'userTester', password: 'bbbbbb' },
{ key: 'USUARIO ERRONEO', nombreUsuario: 'usuarioIncorrecto', password: '12345678' }];

//FECHA PARA EL REGISTRO
const fechaActual = moment().locale('es');

//get date minus 16 years from fechaActual
const fechaNacimientoMinima = moment(fechaActual).subtract(16, 'years').format('YYYY-MM-DD');

//get date minus 1 day from fechaActual
const fechaNacimientoFalta1Dia = moment(fechaActual).subtract(1, 'days').format('YYYY-MM-DD');

//get date plus 1 day from fechaActual
const fechaNacimientoFutura = moment(fechaActual).add(1, 'days').format('YYYY-MM-DD');

//REGISTRO
const casosPositivosRegistro = [
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


const casosNegativosRegistro = [
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
        key: "CASO 9: NOMBREUSUARIO NO ÚNICO",
        nombre: "nombre",
        nombreUsuario: "userTester",
        email: "email3@gmail.com",
        password: "1234567a"
    },
    {
        key: "CASO 10: NOMBREUSUARIO VACIO",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        email: "email3@gmail.com",
        password: "1234567a"
    },
    {
        key: "CASO 11: EMAIL FORMATO INCORRECTO",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "estonoesunemail",
        password: "1234567a"
    },
    {
        key: "CASO 12: EMAIL NO ÚNICO",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "test@user.com",
        password: "1234567a"
    },
    {
        key: "CASO 13: EMAIL VACÍO",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        password: "1234567a"
    },
    {
        key: "CASO 14: PASSWORD 7 CARACTERES",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567"
    },
    {
        key: "CASO 15: PASSWORD EN BLANCO 8 CARACTERES",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "        "
    },
    {
        key: "Caso 16: PASSWORD VACÍA",
        nombre: "nombre",
        fechaNacimiento: "2000-06-07",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com"
    },

    {
        key: "Caso 17: FECHA DE NACIMIENTO VACÍA",
        nombre: "nombre",
        fechaNacimiento: "",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    },

    {
        key: "Caso 18: CUALQUIER VALOR EN EL CAMPO FECHANACIMIENTO",
        nombre: "nombre",
        fechaNacimiento: "AAAA",
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    },

    {
        key: "Caso 19: FECHANACIMIENTO 1 DÍA ANTERIOR A LA MÍNIMA",
        nombre: "nombre",
        fechaNacimiento: fechaNacimientoFalta1Dia,
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    },

    {
        key: "Caso 19: FECHANACIMIENTO FUTURA",
        nombre: "nombre",
        fechaNacimiento: fechaNacimientoFutura,
        nombreUsuario: "usuarioA",
        email: "email3@gmail.com",
        password: "1234567a"
    }


]

module.exports = {casosNegativosLogin, casosPositivosRegistro, casosNegativosRegistro}