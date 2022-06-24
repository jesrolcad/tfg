<template>
<div class="Filtros">
    <div class="container">
        <form @submit.prevent="filtrarProgramas">
        <div class="row">
            <div class="col-sm-4" style="font-family:abeezeeregular;">
                <h1 style="color: var(--bs-blue);font-size: 25px;margin-bottom: 0px;margin-left: 10px;"><strong>Tipo:</strong></h1>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked v-model="tipo" value="Serie">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Serie</label>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked v-model="tipo" value="Película">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Película</label>
                </div>
            </div>
            <div class="col-sm-4" style="font-family:abeezeeregular;">
                <h1 style="color: var(--bs-blue);font-size: 25px;margin-bottom: 0px;margin-left: 10px;"><strong>Géneros:</strong></h1>
                <select class="form-select" multiple v-model="generos">
                    <option  v-for="genero of allgeneros" :key="genero" :value="genero" >{{genero}}</option>
                </select>
            </div>
            <div class="col-sm-4">
                <h1 style="font-family:abeezeeregular;color: var(--bs-blue);font-size: 25px;margin-bottom: 0px;margin-left: 10px;"><strong>Plataformas:</strong></h1>
                    <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" class="btn-check" id="Netflix" value="Netflix" autocomplete="off" v-model="plataformas">
                        <label class="btn btn-outline-primary" for="Netflix">Netflix</label>

                        <input type="checkbox" class="btn-check" id="Amazon Prime Video" value="Amazon Prime Video" autocomplete="off" v-model="plataformas">
                        <label class="btn btn-outline-primary" for="Amazon Prime Video">Amazon Prime Video</label>

                        <input type="checkbox" class="btn-check" id="HBO" value="HBO" autocomplete="off" v-model="plataformas">
                        <label class="btn btn-outline-primary" for="HBO">HBO</label>

                        <input type="checkbox" class="btn-check" id="Disney" value="Disney" autocomplete="off" v-model="plataformas">
                        <label class="btn btn-outline-primary" for="Disney">Disney</label>
                    </div>
            </div>
            <div>
                <button class="btn btn-primary btn-sm">Filtrar</button>
            </div>
        </div>
        </form>
    </div>

</div>
</template>
<style>
.btn-primary{
    width: 60px;height: 60px;margin: 9px;margin-left: 13px;
}
</style>
<script>

export default {
data() {
    return {
        baseURL: "http://localhost:5000",
        tipo: [],
        allgeneros:[],
        generos:[],
        plataformas:[],
        filtrados:[]
    }
  },
created(){
    this.getGeneros();
},
methods:{
    getGeneros(){
        fetch(this.baseURL+'/programas/generos')
            .then(res=> res.json())
            .then(data => {
                this.allgeneros=data[0]["generos"];
            });
    },
    filtrarProgramas(){
        fetch(this.baseURL+ '/programas/filtrados',
                {   method: 'POST',
                    headers: {'Accept': 'application/json','Content-type':'application/json'},
                    body: JSON.stringify({"tipo":this.tipo,"generos":this.generos,"plataformas":this.plataformas})
                })
                .then(res=> res.json())
                .then(data => {
                    this.filtrados=data;
                });
        this.$emit('escucharFiltros',this.filtrados)
    }
}
}
</script>
