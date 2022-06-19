
<template>
    <div class="Programas">
        <h1 style="font-family:montserratbold;">Programas</h1>
    </div>
    <div class="card-group" >
        <div class="col-3" v-for="programa of programas" :key="programa._id">
            <router-link :to="`/programa/${programa._id}`"><img class="card-img-top w-100 d-block"
                        :src="programa.imagen || 'placeholder.png'"> </router-link>
            <div class="card-body" style="margin: 10px">
                <h4 class="card-title">{{programa.titulo}}</h4>
                <small style="font-family:abeezeeregular;">{{moment(programa.fecha).locale('es').format("D MMM YYYY")}}</small>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    class Programa{
        constructor(_id,tipo,titulo,fecha,imagen){
            this._id=_id;
            this.tipo=tipo;
            this.titulo=titulo;
            this.fecha=fecha;
            this.imagen= imagen;
        }
    }
    export default {
        data(){
            return{
                programa: new Programa(),
                programas:[]
            }
        },
        created(){
            this.getProgramas()
        },
        methods:{
            getProgramas(){
                fetch('http://localhost:5000/programas/all')
                    .then(res=> res.json())
                    .then(data => {
                        this.programas=data;
                    });
            },
            moment
        }
    }
</script>
<style>
.col-3{
    margin: 20px;
    font-family: montserratbold;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: none;
}
.card-img-top{
    border-radius: 20px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}
</style>