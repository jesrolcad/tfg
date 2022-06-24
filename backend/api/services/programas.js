
const Programa=require('../../models/Programa');

module.exports.getAllProgramas = async (req,res) => {
    const programas= await Programa.find()
        .select({ "titulo": 1, "tipo":1, "fecha":1, "imagen":1, "_id": 1})
        .sort({fecha:'desc'});
    res.json(programas);
}

module.exports.getProgramaById = async (req,res) => {
    const programa= await Programa.findById(req.params.id);
    res.json(programa);
}

module.exports.buscarPorGenero = async function buscarPorGenero(req, res){
    let body = req.body;
    await Programa.find({"generos": {"$elemMatch":{$eq:`${body.genero}`}}}).then((result) => {
        if(result.length > 0) {
            res.status(200).json({result});
        } else {
            res.status(200).json({"mensaje": "No se han encontrado programas con el género especificado"});
        }
    })
};

module.exports.buscarPorPlataforma = async function buscarPorPlataforma(req, res){
    let body = req.body;
    await Programa.find({"plataformas": {"$elemMatch":{$eq:`${body.plataforma}`}}}).then((result) => {
        if(result.length > 0) {
            res.status(200).json({result});
        } else {
            res.status(200).json({"mensaje": "No se han encontrado programas con la plataforma especificada"});
        }
    })
};

module.exports.buscarPorTipo = async function buscarPorTipo(req, res){
    let body = req.body;
    await Programa.find({"tipo": `${body.tipo}`}).then((result) => {
        if(result.length > 0) {
            res.status(200).json({result});
        }else {
            res.status(200).json({"mensaje": "No se han encontrado programas"});
        }
    })
};

module.exports.getGeneros = async (req,res)=>{
    const generosRes=await Programa.aggregate(
        [   { '$project': { '_id': 0, 'generos': 1 } },
            { '$unwind': { 'path': '$generos'  } },
            { "$group": { "_id": "nuevo_id", "generos": {"$addToSet": "$generos"} }},
            { '$project': { '_id': 0, 'generos': 1 } }
        ]
    );
    res.json(generosRes);
}

module.exports.getProgramasFiltados= async (req,res)=> {
    let plataformas=req.body.plataformas;
    let generos= req.body.generos;
    let tipo= req.body.tipo;
    if(tipo==null){
        tipo=["Película","Serie"]
    }
    let filtrados;

    if(plataformas==null & generos!=null){
        filtrados=await Programa.find({
            generos:{$all:generos},tipo:{$in:tipo}}).select({ "titulo": 1, "tipo":1, "fecha":1, "imagen":1, "_id": 1});
    }else if(plataformas!=null &  generos==null){
        filtrados=await Programa.find({
            plataformas:{$all:plataformas},tipo:{$in:tipo}}).select({ "titulo": 1, "tipo":1, "fecha":1, "imagen":1, "_id": 1});
    }else if(plataformas!=null & generos!=null){
        filtrados=await Programa.find({ generos:{$all:generos},
            plataformas:{$all:plataformas},tipo:{$in:tipo}}).select({ "titulo": 1, "tipo":1, "fecha":1, "imagen":1, "_id": 1});
    }else{
        filtrados=await Programa.find({tipo:{$in:tipo}}).select({ "titulo": 1, "tipo":1, "fecha":1, "imagen":1, "_id": 1});
    }
    res.json(filtrados);
}

/*module.exports.getProgramaByURL = async (req,res) => {
    const programa= await Programa.find({"titulo_url": {'$regex': '.*'+req.params.url+'.*'}});
    res.json(programa);
}*/
