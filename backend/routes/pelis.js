const { trackSlotScopes } = require('@vue/compiler-core');
const express = require('express');
const router= express.Router();

const Programa=require('../models/Programa');

router.get('/', async(req,res) => {
    const programas= await Programa.find().select({ "titulo": 1, "tipo":1, "fecha":1, "imagen":1, "_id": 0}).sort({fecha:'ascending'}).limit(20);
    //console.log(programas);
    res.json(programas);
});

router.post('/', async(req,res) => {
    const prog = new Programa(req.body);
    await prog.save();
    res.json({status: "Programa guardado"});
});

router.put('/:id',async(req,res) => {
    //console.log(req.params);
    //console.log(req.body);
    await Programa.findByIdAndUpdate(req.params.id,req.body);
    res.json({
        status: "Programa actualizado"
    })
});

router.delete('/:id',async(req,res) => {
    await Programa.findByIdAndRemove(req.params.id);
    res.json({
        status: "Programa eliminado"
    })
});

module.exports = router;