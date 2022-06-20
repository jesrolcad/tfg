
const Programa=require('../../models/Programa');

module.exports.getAllProgramas = async (req,res) => {
    const programas= await Programa.find()
        .select({ "titulo": 1, "tipo":1, "fecha":1, "imagen":1})
        .sort({fecha:'desc'}).limit(21);
    res.json(programas);
}

module.exports.getProgramaById = async (req,res) => {
    const programa= await Programa.findById(req.params.id);
    res.json(programa);
}

/*module.exports.getProgramaByURL = async (req,res) => {
    const programa= await Programa.find({"titulo_url": {'$regex': '.*'+req.params.url+'.*'}});
    res.json(programa);
}*/
