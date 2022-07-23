const Insignia = require('../../models/Insignia');
const Lista = require('../../models/Lista');
const Usuario = require('../../models/Usuario');
const mongoose = require('mongoose');

module.exports.insigniasUsuario= async function(userId){
    let insignias= await Usuario.findById(mongoose.Types.ObjectId(userId));
    return insignias.insignias;
}

module.exports.addInsignia= async function(userId, insignia){
    if(insigniasUsuario(userId).includes(insignia)){
        return false;
    }else{
        Usuario.updateOne({_id : mongoose.Types.ObjectId(userId), insignias : {$ne : insignia}},
        {"$push" : { "insignias" : insignia}},{ "new": true, "upsert": true });
        return true;
    }
}

module.exports.getProgramasVistos = async function (req,res) {
    let insigniasUsuario = await this.insigniasUsuario(req.user._id);
    const BronceWatcher= insigniasUsuario.includes("Bronce Watcher");
    const SilverWatcher=insigniasUsuario.includes("Silver Watcher");
    const GoldWatcher=insigniasUsuario.includes("Gold Watcher");

    if(!BronceWatcher || !SilverWatcher || !GoldWatcher){
        const programasVistos = await Lista.aggregate(
            [
                {
                    '$match': {
                        'usuario': mongoose.Types.ObjectId(req.user._id),
                        'nombre': 'Programas vistos'
                    }
                }, {
                    '$unwind': {
                        'path': '$programas'
                    }
                }, {
                    '$count': 'programa'
                }
            ]
        )
        if(programasVistos.length!=0){
            if(parseInt(programasVistos[0].programa)== 10){
                addInsignia(req.user._id, "Bronce Watcher");
                res.status(200).json({'key': 10,'insignia': 'Bronce Watcher'})
            }else if(parseInt(programasVistos[0].programa)== 25){
                addInsignia(req.user._id, "Silver Watcher");
                res.status(200).json({'key': 25,'insignia': 'Silver Watcher'})
            }else if(parseInt(programasVistos[0].programa)== 50){
                addInsignia(req.user._id, "Gold Watcher");
                res.status(200).json({'key': 50,'insignia': 'Gold Watcher'})
            }else{
                res.status(200).json({'mensaje': 'No hay insignias. Programas vistos: '+ JSON.stringify(programasVistos[0].programa)})
            }
        }else{
            res.status(200).json({'mensaje': 'No hay insignias. Programas vistos: 0'});
        }
    }else{
        res.status(200).json({'mensaje': 'Este usuario ya posee todas las insignias de programas vistos.'});
    }

}

module.exports.getListasPropias = async function (req,res) {
    let insigniasUsuario = await this.insigniasUsuario(req.user._id);
    const ListBeginner= insigniasUsuario.includes("List Beginner");
    const ListExpert=insigniasUsuario.includes("List Expert");
    const ListFreak=insigniasUsuario.includes("List Freak");

    if(!ListBeginner || !ListExpert || !ListFreak){
        const listasPropias = await Lista.aggregate(
            [
                {
                    '$match': {
                        'usuario': mongoose.Types.ObjectId(req.user._id),
                        'nombre': {
                        '$nin': [
                            'Programas vistos', 'En seguimiento'
                        ]
                        }
                    }
                }, {
                    '$count': 'listasPropias'
                }
            ]
        )
        if(listasPropias.length!=0){
            if(parseInt(listasPropias[0].listasPropias)== 1){
                addInsignia(req.user._id, "List Beginner");
                res.status(200).json({'key': 1,'insignia': 'List Beginner'})
            }else if(parseInt(listasPropias[0].listasPropias)== 3){
                addInsignia(req.user._id, "List Expert");
                res.status(200).json({'key': 3,'insignia': 'List Expert'})
            }else if(parseInt(listasPropias[0].listasPropias)== 5){
                addInsignia(req.user._id, "List Freak");
                res.status(200).json({'key': 5,'insignia': 'List Freak'})
            }else{
                res.status(200).json({'mensaje': 'No hay insignias. Listas propias: '+ JSON.stringify(listasPropias[0].listasPropias)})
            }
        }else{
            res.status(200).json({'mensaje': 'No hay insignias. Listas propias: 0'});
        }
    }else{
        res.status(200).json({'mensaje': 'Este usuario ya posee todas las insignias de listas propias.'});
    }
}

module.exports.getProgramasListasPropias = async function (req,res) {
    let insigniasUsuario = await this.insigniasUsuario(req.user._id);
    const BronceList= insigniasUsuario.includes("Bronce List");
    const SilverList=insigniasUsuario.includes("Silver List");
    const GoldList=insigniasUsuario.includes("Gold List");

    if(!BronceList || !GoldList || !SilverList){
        const programasLP = await Lista.aggregate(
            [
                {
                    '$match': {
                        'usuario': mongoose.Types.ObjectId(req.user._id),
                        'nombre': {
                            '$nin': ['Programas vistos', 'En seguimiento']
                        }
                    }
                }
            ]
        )
        var five=new Boolean(false);
        var ten=new Boolean(false);
        var twenty=new Boolean(false);

        for (var i=0;i<programasLP.length;i++) {
            if(programasLP[i].programas.length==5 && !five){
                five=true;
            }else if(programasLP[i].programas.length==10 && !ten){
                ten=true;
            }else if(programasLP[i].programas.length==20 && !twenty){
                twenty=true;
            }
        }

        if((five || ten || twenty)== true){
            if(five){
                var bronce= addInsignia(req.user._id,"Bronce List");
            }
            if(ten){
                var silver=addInsignia(req.user._id,"Silver List");
            }
            if(twenty){
                var gold=addInsignia(req.user._id,"Gold List");
            }
            res.status(200).json({'Bronce List': bronce, 'Silver List': silver, 'Gold List': gold});
        }else{
            res.status(200).json({'mensaje': 'No hay insignias.'});
        }
    }else{
        res.status(200).json({'mensaje': 'Este usuario ya posee todas las insignias de programas en listas propias.'});
    }
}

module.exports.getGenerosProgramasVistos = async function (req,res) {
    let insigniasUsuario = await this.insigniasUsuario(req.user._id);
    const AmateurGenreWatcher= insigniasUsuario.includes("Amateur Genre Watcher");
    const IntermediateGenreWatcher=insigniasUsuario.includes("Intermediate Genre Watcher");
    const ProfessionalGenreWatcher=insigniasUsuario.includes("Professional Genre Watcher");

    if(!AmateurGenreWatcher || !IntermediateGenreWatcher || !ProfessionalGenreWatcher){
        const generosProgramas = await Lista.aggregate(
            [
                {
                    '$match': {
                        'usuario': mongoose.Types.ObjectId(req.user._id),
                        'nombre': 'Programas vistos'
                    }
                }, {
                    '$unwind': {
                        'path': '$programas'
                    }
                }, {
                    '$set': {
                        'programas': {
                        '$toObjectId': '$programas'
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'programas',
                        'localField': 'programas',
                        'foreignField': '_id',
                        'as': 'result'
                    }
                }, {
                    '$unwind': {
                        'path': '$result'
                    }
                }, {
                    '$unwind': {
                        'path': '$result.generos'
                    }
                }, {
                    '$group': {
                        '_id': '$result.generos',
                        'count': {
                        '$sum': 1
                        }
                    }
                }, {
                    '$match': {
                        'count': {
                        '$gte': 5
                        }
                    }
                }
            ]
        )

        var five=new Boolean(false);
        var ten=new Boolean(false);
        var twenty=new Boolean(false);

        if(generosProgramas.length!=0){
            for (var i=0;i<generosProgramas.length;i++) {
                if(generosProgramas[i].count==5 && !five){
                    var amateur=addInsignia(req.user._id,"Amateur Genre Watcher")
                    five=true;
                }else if(generosProgramas[i].count==10 && !ten){
                    var intermediate=addInsignia(req.user._id,"Intermediate Genre Watcher")
                    ten=true;
                }else if(generosProgramas[i].count==20 && !twenty){
                    var professional=addInsignia(req.user._id,"Professional Genre Watcher")
                    twenty=true;
                }
            }
            if((amateur || intermediate || professional)== true){
                res.status(200).json({'Amateur Genre Watcher': amateur, 'Intermediate Genre Watcher': intermediate,
                'Professional Genre Watcher': professional});
            }
            else{
                res.status(200).json({'mensaje': 'No hay insignias.'});
            }
        }else{
            res.status(200).json({'mensaje': 'No hay insignias.'});
        }
    }else{
        res.status(200).json({'mensaje': 'Este usuario ya posee todas las insignias de generos.'});
    }
}

module.exports.getActoresProgramasVistos = async function (req,res) {
    let insigniasUsuario = await this.insigniasUsuario(req.user._id);
    const ActorActressFan= insigniasUsuario.includes("Actor/Actress Fan");
    const ActorActressLover=insigniasUsuario.includes("Actor/Actress Lover");
    const ActorActressAddict=insigniasUsuario.includes("Actor/Actress Addict");

    if(!ActorActressFan || !ActorActressLover || !ActorActressAddict){
        const actoresProgramas = await Lista.aggregate(
            [
                {
                    '$match': {
                        'usuario': mongoose.Types.ObjectId(req.user._id),
                        'nombre': 'Programas vistos'
                    }
                }, {
                    '$unwind': {
                        'path': '$programas'
                    }
                }, {
                    '$set': {
                        'programas': {
                        '$toObjectId': '$programas'
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'programas',
                        'localField': 'programas',
                        'foreignField': '_id',
                        'as': 'result'
                    }
                }, {
                    '$unwind': {
                        'path': '$result'
                    }
                }, {
                    '$unwind': {
                        'path': '$result.actoresIds'
                    }
                }, {
                    '$group': {
                        '_id': 'expression',
                        'actoresIds': {
                        '$addToSet': '$result.actoresIds'
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'actores',
                        'localField': 'actoresIds',
                        'foreignField': '_id',
                        'as': 'actoresIds'
                    }
                }, {
                    '$unwind': {
                        'path': '$actoresIds'
                    }
                }, {
                    '$group': {
                        '_id': '$actoresIds.nombre',
                        'uniqueIds': {
                        '$addToSet': '$actoresIds.nombre'
                        },
                        'count': {
                        '$sum': 1
                        }
                    }
                }, {
                    '$match': {
                        'count': {
                        '$gt': 3
                        }
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'count': 1
                    }
                }
            ]
        )
        var three=new Boolean(false);
        var five=new Boolean(false);
        var ten=new Boolean(false);

        if(actoresProgramas.length!=0){
            for (var i=0;i<actoresProgramas.length;i++) {
                if(actoresProgramas[i].count==3 && !three){
                    var fan=addInsignia(req.user._id,"Actor/Actress Fan")
                    three=true;
                }else if(actoresProgramas[i].count==5 && !five){
                    var lover=addInsignia(req.user._id,"Actor/Actress Lover")
                    five=true;
                }else if(actoresProgramas[i].count==10 && !ten){
                    var addict=addInsignia(req.user._id,"Actor/Actress Addict")
                    ten=true;
                }
            }
            if((fan || addict || lover)== true){
                res.status(200).json({'Actor/Actress Fan': fan, 'Actor/Actress Lover': lover,
                'Actor/Actress Addict': addict});
            }
            else{
                res.status(200).json({'mensaje': 'No hay insignias.'});
            }
        }else{
            res.status(200).json({'mensaje': 'No hay insignias.'});
        }
    }else{
        res.status(200).json({'mensaje': 'Este usuario ya posee todas las insignias de actores.'});
    }
}
