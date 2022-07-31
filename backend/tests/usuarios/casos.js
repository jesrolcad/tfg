//LOGIN
const casosNegativosLogin = [{ key: 'USUARIO Y CONTRASEÑA VACIOS', nombreUsuario: '', password: '' },
{ key: 'CONTRASEÑA VACIA', nombreUsuario: 'userTest', password: '' },
{ key: 'USUARIO VACIO', nombreUsuario: '', password: '12345678' },
{ key: 'CONTRASEÑA ERRONEA', nombreUsuario: 'userTester', password: 'bbbbbb' },
{ key: 'USUARIO ERRONEO', nombreUsuario: 'usuarioIncorrecto', password: '12345678' }];

//REGISTRO
const casosPositivosRegistro = [{
    key: "CASO 1: nombre 5 caracteres, nombreUsuario 5 caracteres, password 8 caracteres",
    nombre: "abcde",
    nombreUsuario: "usuar",
    email: "email1@mail.com",
    password: "12345678"
},
{
    key: "CASO 2: nombre 49 caracteres, nombreUsuario 29 caracteres",
    nombre: "nombre nombre nombre nombre nombre nombre nombree",
    nombreUsuario: "usuariousuariousuariousuariou",
    email: "email2@outlook.com",
    password: "abcedfg1"
},
{
    key: "CASO 3",
    nombre: "Jesús Roldán Cadena",
    nombreUsuario: "usuarioY",
    email: "email3@us.es",
    password: "1234567a"
},
{
    key: "CASO 4",
    nombre: "Lucía Torres Gómez",
    nombreUsuario: "usuarioZ",
    email: "email4@alum.com",
    password: "qwertyuiop"
}]


const casosNegativosRegistro = [
    {
        "key": "CASO 1: NOMBRE 4 CARACTERES",
        "nombre": "abcd",
        "nombreUsuario": "usuario",
        "email": "email1@gmail.com",
        "password": "12345678"
    },
    {
        "key": "CASO 2: NOMBRE 51 CARACTERES",
        "nombre": "nombre nombre nombre nombre nombre nombre nombre no",
        "nombreUsuario": "usuariousuariousuariousuariou",
        "email": "email2@gmail.com",
        "password": "abcedfg1"
    },
    {
        "key": "CASO 3: NOMBRE NÚMEROS",
        "nombre": "Jesús Roldán Cadena1",
        "nombreUsuario": "usuarioA",
        "email": "email3@gmail.com",
        "password": "1234567a"
    },
    {
        "key": "CASO 4: NOMBRE VACÍO",
        "nombreUsuario": "usuarioB",
        "email": "email4@gmail.com",
        "password": "qwertyuiop"
    },
    {
        "key": "CASO 5: NOMBRE CON ESPACIOS",
        "nombre": " ",
        "nombreUsuario": "usuarioA",
        "email": "email3@gmail.com",
        "password": "1234567a"
    },
    {
        "key": "CASO 6: NOMBREUSUARIO 4 CARACTERES",
        "nombre": "nombre",
        "nombreUsuario": "usua",
        "email": "email3@gmail.com",
        "password": "1234567a"
    },
    {
        "key": "CASO 7: NOMBREUSUARIO 31 CARACTERES",
        "nombre": "nombre",
        "nombreUsuario": "usuariousuariousuariousuariousu",
        "email": "email3@gmail.com",
        "password": "1234567a"
    },
    {
        "key": "CASO 8: NOMBREUSUARIO NÚMEROS",
        "nombre": "nombre",
        "nombreUsuario": "usuario12",
        "email": "email3@gmail.com",
        "password": "1234567a"
    },
    {
        "key": "CASO 9: NOMBREUSUARIO NO ÚNICO",
        "nombre": "nombre",
        "nombreUsuario": "userTester",
        "email": "email3@gmail.com",
        "password": "1234567a"
    },
    {
        "key": "CASO 10: NOMBREUSUARIO VACIO",
        "nombre": "nombre",
        "email": "email3@gmail.com",
        "password": "1234567a"
    },
    {
        "key": "CASO 11: EMAIL FORMATO INCORRECTO",
        "nombre": "nombre",
        "nombreUsuario": "usuarioA",
        "email": "estonoesunemail",
        "password": "1234567a"
    },
    {
        "key": "CASO 12: EMAIL NO ÚNICO",
        "nombre": "nombre",
        "nombreUsuario": "usuarioA",
        "email": "test@user.com",
        "password": "1234567a"
    },
    {
        "key": "CASO 13: EMAIL VACÍO",
        "nombre": "nombre",
        "nombreUsuario": "usuarioA",
        "password": "1234567a"
    },
    {
        "key": "CASO 14: PASSWORD 7 CARACTERES",
        "nombre": "nombre",
        "nombreUsuario": "usuarioA",
        "email": "email3@gmail.com",
        "password": "1234567"
    },
    {
        "key": "CASO 15: PASSWORD EN BLANCO 8 CARACTERES",
        "nombre": "nombre",
        "nombreUsuario": "usuarioA",
        "email": "email3@gmail.com",
        "password": "        "
    },
    {
        "key": "Caso 16: PASSWORD VACÍA",
        "nombre": "nombre",
        "nombreUsuario": "usuarioA",
        "email": "email3@gmail.com"
    }
]

module.exports = {casosNegativosLogin, casosPositivosRegistro, casosNegativosRegistro}