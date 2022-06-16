const {body, validationResult} = require('express-validator');

module.exports.registroSchema = [
    
body('nombre').exists({checkFalsy: true}).withMessage("El nombre es obligatorio"),
body('nombreUsuario').exists({checkFalsy: true}).withMessage("El nombre de usuario es obligatorio"),
body('email').isEmail().withMessage("No sigue el formato adecuado"),
body('password').isLength({ min: 8 }).withMessage("La contraseña debe tener como mínimo 8 caracteres"),

(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
}

]