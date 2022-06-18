
<template>
    <div class="Programas">
        <h1>Programas</h1>
    </div>
    <div class="card-group" >
        <div class="col-3" style="margin: 20px;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,
        Helvetica Neue,sans-serif;border-radius: 20px;box-shadow: 0px 0px 5px var(--bs-gray-400);border-style: none;"  v-for="programa of programas">
            <img class="card-img-top w-100 d-block" style="border-radius: 20px;border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;" :src="programa.imagen || 'placeholder.png'"> 
            <div class="card-body" style="margin: 10px">
                <h4 class="card-title">{{programa.titulo}}</h4>
                <small>{{moment(programa.fecha).locale('es').format("D MMM YYYY")}}</small>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    class Programa{
        constructor(tipo,titulo,fecha,imagen){
            this.tipo=tipo;
            this.titulo=titulo;
            this.fecha=fecha;
            this.imagen= imagen;
            /*if(tipo=="Película"){
                booleano=true;
            }else{
                booleano=false;
            }
            this.booleano=booleano;*/
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