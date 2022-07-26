const Usuario = require('../../models/Usuario');
const Programa = require('../../models/Programa');
const Actor = require('../../models/Actor');
const Puntuacion = require('../../models/Puntuacion');
const Lista = require('../../models/Lista');
const Insignia = require('../../models/Insignia');

module.exports.getPieActores= async function(req,res) {
    const actores= await (await Actor.distinct('nombre')).length;
    const personajes= await Actor.countDocuments({});
    const listas= await Lista.countDocuments({});
    res.status(200).json({Actores: actores, Personajes:personajes})
}

module.exports.getProgramasPuntuados= async function(req,res) {
    const programasPuntuados= await (await Puntuacion.distinct('programa')).length;
    const puntuaciones= await Puntuacion.countDocuments({});
    res.status(200).json({puntuados: programasPuntuados, puntuaciones:puntuaciones})
}

module.exports.getProgramas= async function(req,res) {
    const programas= await Programa.countDocuments({});
    let num = Math.abs(programas) > 999 ? Math.sign(programas)*((Math.abs(programas)/1000).toFixed(1)) + 'k' : Math.sign(programas)*Math.abs(programas)
    res.status(200).json({Programas:num})
}

module.exports.getUsuariosMes=async function(req,res) {
    const usuariosTotales= await Usuario.countDocuments({});
    const usuariosPorMes= await Usuario.aggregate(
        [
            {
                '$group': {
                    '_id': {
                    '$month': '$createdAt'
                    },
                    'count': {
                    '$sum': 1
                    }
                }
            }, {
                '$sort': {
                    '_id': 1
                }
            }, {
                '$project': {
                    '_id': 0,
                    'Month': {
                        '$arrayElemAt':
                            [['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], '$_id']
                    },
                    'Count': '$count'
                }
            }
          ]
    )
    let meses=[];
    let count=[];
    for(var i = 0; i < usuariosPorMes.length ; i++){
        meses.push(usuariosPorMes[i]['Month'])
        count.push(usuariosPorMes[i]['Count'])
    }
    res.status(200).json({meses: meses, count: count,total:usuariosTotales});
}

module.exports.getProgramasPorGenero=async function(req,res) {
    const programasGenero= await Programa.aggregate(
        [
            {
                '$unwind': {
                    'path': '$generos'
                }
            }, {
                '$group': {
                    '_id': '$generos',
                    'count': {
                    '$sum': 1
                    }
                }
            }
        ]
    )
    let generos=[];
    let count=[];
    for(var i = 0; i < programasGenero.length ; i++){
        generos.push(programasGenero[i]['_id'])
        count.push(programasGenero[i]['count'])
    }
    res.status(200).json({generos: generos, count: count});
}

module.exports.getUsuariosInsignia=async function(req,res) {
    const usuariosInsignia= await Usuario.aggregate(
        [
            {
                '$match': {
                    'insignias': {
                    '$exists': true,
                    '$ne': []
                    }
                }
            }, {
                '$unwind': {
                    'path': '$insignias'
                }
            }, {
                '$group': {
                    '_id': '$insignias',
                    'count': {
                    '$sum': 1
                    }
                }
            }
        ]
    )
    let insignias=[];
    let count=[];
    for(var i = 0; i < usuariosInsignia.length ; i++){
        insignias.push(usuariosInsignia[i]['_id'])
        count.push(usuariosInsignia[i]['count'])
    }
    res.status(200).json({insignias: insignias, count: count});
}
