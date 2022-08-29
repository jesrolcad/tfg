<template>
    <div class="RecomendacionesUsuario">
        <div v-if="recomendados.length !== 0 && !recomendados.mensaje" class="row">
                <h3 class="mt-5">Recomendaciones según tus gustos</h3>
                <div class="card-group" style="justify-content: space-evenly;" >
                    <div class="col-8" v-for="recomendado of recomendados" :key="recomendado._id">
                        <router-link  :to="`/programa/${recomendado._id}`">
                        <img v-if="recomendado.imagen" class="card-img-top" :src="recomendado.imagen">
                        <img v-if="!recomendado.imagen" class="card-img-top" src='..\..\public\placeholder.png' >
                        </router-link>
                        <div class="card-body" style="margin: 10px; height: max-content; word-wrap: break-word;" >
                            <h5 class="card-title">{{ recomendado.titulo }}</h5>
                            <small style="font-family:abeezeeregular;">{{moment(recomendado.fecha).locale('es').format("D MMM YYYY")}}</small>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import moment from 'moment'
export default{
    data() {
        return{
            baseURL: "http://localhost:5000",
            recomendados :[],
        }
    },
    created(){
        this.getRecomendado()
    },
    methods: {
        async getRecomendado() {
            await fetch(this.baseURL+'/recomendaciones/usuario',
            {method: 'POST',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.recomendados = data;
                });
        },
        moment
    }
}
</script>
<style scoped>
    .card-img-top {
        border-radius: 20px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
    }

    .col-8{
        margin-top: 20px;
        margin-block-end: 20px;
        width: 200px;
        height: auto;
        font-family: montserratbold;
        border-radius: 20px;
        box-shadow: 0px 0px 5px var(--bs-gray-400);
        border-style: none;
    }
</style>