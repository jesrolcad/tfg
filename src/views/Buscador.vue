<template>
    <div class="Buscador">
        <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="titulo" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" v-on:click="buscarProgramas()">Buscar</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
        baseURL: "http://localhost:5000",
        titulo: [],
        buscados:[]
    }
    },
    methods:{
        async buscarProgramas(){
        await fetch(this.baseURL+ '/programas/nombre',
                {   method: 'POST',
                    headers: {'Accept': 'application/json','Content-type':'application/json'},
                    body: JSON.stringify({"titulo":this.titulo})
                })
                .then(res=> res.json())
                .then(data => {
                    this.buscados=data;
                }).then(this.emitter.emit('escuchar-busqueda',this.buscados));
        console.log("En el buscador: " + this.buscados);
        this.$router.push({name: 'ProgramasBuscados'})
        //this.$emit('escucharBusqueda',this.buscados)
    }
    }
}
</script>