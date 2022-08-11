const casosDeleteValidation = [
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
    },

    {
        key: "USUARIO VACÍO",
        nombreUsuario: "",
        password: "randomPassword",
    },

    {
        key: "CONTRASEÑA VACÍA",
        nombreUsuario: "randomUser",
        password: "",
    }
]

module.exports = {casosDeleteValidation, casosNegativosLoginSubmit}