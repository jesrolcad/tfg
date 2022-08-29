<template>
    <div class="Sugerencias">
        <button style="margin-left: 10px;" type="button" class="btn btn-primary btn-lg btn-block"
        @click="showModal = true; getSugerencias();" data-bs-toggle="modal" data-bs-target="#myModal">Sugerencias</button>
        <div v-if="showModal" class="modal">
            <div v-if="sugeridos.mensaje" class="row">
                <div style="position: absolute; margin-left:900px"><button class="btn btn-secondary" style="width: min-content;height: min-content;" @click="showModal = false">X</button></div>
                <h4>{{sugeridos.mensaje}}</h4>
            </div>
            <div v-else class="row">
                <div style="position: absolute; margin-left:900px"><button class="btn btn-secondary" style="width: min-content;height: min-content;" @click="showModal = false">X</button></div>
                <h3 >Programas similares</h3>
                <div class="card-group" style="justify-content: space-evenly;" >
                    <div class="col-2" v-for="sugerido of sugeridos" :key="sugerido._id">
                        <router-link  :to="`/programa/${sugerido._id}`">
                        <img v-if="sugerido.imagen" class="card-img-top" :src="sugerido.imagen">
                        <img v-if="!sugerido.imagen" class="card-img-top" src='..\..\public\placeholder.png' >
                        </router-link>
                        <div class="card-body" style="margin: 10px; height: max-content; word-wrap: break-word;" >
                            <h5 class="card-title">{{ sugerido.titulo }}</h5>
                            <small style="font-family:abeezeeregular;">{{moment(sugerido.fecha).locale('es').format("D MMM YYYY")}}</small>
                        </div>
                    </div>
                </div>
            </div>
            
        <!--<div v-if="actoresR.length === 0" class="row" style="margin-top:100px">
                <h1 style="font-family:montserratbold; font-size: 30px;">Reparto no disponible</h1>
            </div>-->
        </div>
    </div>
</template>
<script>
import moment from 'moment'

export default {
    data(){
        return{
            baseURL: "http://localhost:5000",
            sugeridos :[],
            showModal: false,
        }
    },
    props:{
        id: null,
        generos: null
    },
    methods: {
        async getSugerencias() {
            await fetch(this.baseURL+'/recomendaciones/sugerencias',
            {method: 'POST',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'},
            body: JSON.stringify({"idPrograma":this.id,"generos":this.generos})
            })
                .then(res => res.json())
                .then(data => {
                    this.sugeridos = data;
                });
            //this.$emit('escucharSugerencias',this.sugeridos)
        },
        moment
    }
}
</script>
<style scoped>
.Sugerencias{
    position: relative;
}
.modal {
    padding:20px;
    padding-top: 30px;
    position: absolute;
    background: white;
    width:1000px;
    height:auto;
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: var(--bs-gray-400);
    left: auto;
    right: auto;
    top: -15px;
    bottom: auto;
    margin-left: -400px;
    
}

.card-img-top {
    border-radius: 20px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}

.col-2 {
    margin: 20px;
    margin-block-end: 20px;
    width: 200px;
    height: auto;
    font-family: montserratbold;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: none;
}
</style>