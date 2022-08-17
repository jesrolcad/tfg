const Usuario = require('../../models/Usuario');
const Programa = require('../../models/Programa');
const Actor = require('../../models/Actor');
const Puntuacion = require('../../models/Puntuacion');
const Lista = require('../../models/Lista');
const Insignia = require('../../models/Insignia');

module.exports.getPieActores= async function(req,res) {
    const actores= await (await Actor.distinct('nombre')).length;
    const personajes= await Actor.countDocuments({});
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

module.exports.getListasUsuarios= async function(req, res) {
    const listasUsuarios= await Lista.aggregate(
        [
            {
                '$match': {
                    'nombre': {'$nin': ['Programas vistos', 'En seguimiento'] }
                }
            }, {
                '$group': {
                    '_id': '$usuario',
                    'listaP': {'$sum': 1}
                }
            }, {
                '$group': {
                    '_id': '$listaP',
                    'nUsuarios': {'$sum': 1}
                }
            }
        ]
    );
    if(listasUsuarios.length!=0){
        let usuarios=0;
        let mult=[];
        for(let usuario of listasUsuarios){
            mult.push(usuario['_id']*usuario['nUsuarios'])
            usuarios+=usuario['nUsuarios'];
        }
        let sum= 0;
        for(let num of mult){
            sum+=num;
        }
        let media= Math.round((sum/usuarios)*100)/100;
        return res.status(200).json({listasUsuarios:listasUsuarios,media:media, listas:sum});
    }else{
        return res.status(200).json({mensaje:"No existen usuarios con listas personalizadas."})
    }
}

module.exports.getProgramasLP= async function(req, res) {
    const listasProgramas= await Lista.aggregate(
        [
            {
                '$match': {
                    'nombre': {'$nin': ['Programas vistos', 'En seguimiento']}
                }
            }, {
                '$group': {
                    '_id': {'$size': '$programas'},
                    'numListas': {'$sum': 1}
                }
            }
        ]
    );
    if(listasProgramas.length!=0){
        let listas=0;
        let mult=[];
        for(let programa of listasProgramas){
            mult.push(programa['_id']*programa['numListas'])
            listas+=programa['numListas'];
        }
        let sum= 0;
        for(let num of mult){
            sum+=num;
        }
        let media= Math.round((sum/listas)*100)/100;
        return res.status(200).json({listasProgramas:listasProgramas,media:media, listas:listas});
    }else{
        return res.status(200).json({mensaje:"No existen usuarios con listas personalizadas."})
    }
}

module.exports.getTipoProgramaEdad= async function(req,res) {
    const list= await Lista.aggregate([
        {
            '$match': {
                'nombre': 'Programas vistos',
                'programas': {'$ne': []}
            }
        }, {
            '$lookup': {
                'from': 'usuarios',
                'localField': 'usuario',
                'foreignField': '_id',
                'as': 'usuario'
            }
        }, {
            '$unwind': {'path': '$usuario'}
        }, {
            '$set': {
                'edad': {
                '$floor': { '$divide': [{'$subtract': [ new Date(), '$usuario.fechaNacimiento']}, 31536000000]}
                }
            }
        }, {
            '$project': {
                '_id': 0,
                'programas': 1,
                'edad': 1
            }
        }, {
            '$unwind': {'path': '$programas' }
        }, {
            '$set': {
                'programas': {'$toObjectId': '$programas' }
            }
        }, {
            '$lookup': {
                'from': 'programas',
                'localField': 'programas',
                'foreignField': '_id',
                'as': 'programas'
            }
        }, {
            '$unwind': {'path': '$programas'}
        }, {
            '$set': {'programas': '$programas.tipo' }
        }
    ]
    );
    if(list.length !=0){
        let peliculas= 0;
        let series= 0;
        let edadPelis=[];
        let edadSeries=[];
        for(let i of list){
            if(i['programas']=='Película'){
                edadPelis.push(i['edad']);
                peliculas+=1;
            }else{
                edadSeries.push(i['edad']);
                series+=1;
            }
        }
        var repetidosPelis = {};
        edadPelis.forEach(function(numero){
            repetidosPelis[numero] = (repetidosPelis[numero] || 0) + 1;
        });

        var repetidosSeries = {};
        edadSeries.forEach(function(numero){
            repetidosSeries[numero] = (repetidosSeries[numero] || 0) + 1;
        });

        return res.json({repetidosPelis, repetidosSeries, peliculas, series})
    }else{
        return res.status(200).json({mensaje:"No hay estadisticas de la edad y los tipos de programa."});
    }
}

module.exports.getEdadMediaGenero= async function(req,res) {
    const generosEdad= await Lista.aggregate(
        [
            {
                '$match': {
                    'nombre': 'Programas vistos',
                    'programas': {'$ne': []}
                }
            }, {
                '$lookup': {
                    'from': 'usuarios',
                    'localField': 'usuario',
                    'foreignField': '_id',
                    'as': 'usuario'
                }
            }, {
                '$unwind': {'path': '$usuario'}
            }, {
                '$set': {
                    'edad': {
                    '$floor': {
                        '$divide': [{'$subtract': [new Date(), '$usuario.fechaNacimiento']}, 31536000000]
                    }
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'programas': 1,
                    'edad': 1
                }
            }, {
                '$unwind': {'path': '$programas'}
            }, {
                '$set': {
                    'programas': {'$toObjectId': '$programas'}
                }
            }, {
                '$lookup': {
                    'from': 'programas',
                    'localField': 'programas',
                    'foreignField': '_id',
                    'as': 'programas'
                }
            }, {
                '$unwind': {'path': '$programas'}
            }, {
                '$set': {'programas': '$programas.generos'}
            }, {
                '$unwind': {'path': '$programas'}
            }, {
                '$group': {
                    '_id': '$programas',
                    'edadMedia': {
                    '$avg': '$edad'
                    }
                }
            }
        ]
    );
    if(generosEdad.length!=0){
        return res.status(200).json(generosEdad);
    }else{
        return res.status(200).json({mensaje:"No hay estadisticas de la edad y los géneros."});
    }
}
