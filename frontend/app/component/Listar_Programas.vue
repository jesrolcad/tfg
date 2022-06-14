<template>
<div>
    <h1>Hello World</h1>
    <nav class="navbar navbar-light bg-light">
        <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
        <div class="card-group" >
            <div class="col-3" style="margin: 20px;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,
            Helvetica Neue,sans-serif;border-radius: 20px;box-shadow: 0px 0px 5px var(--bs-gray-400);border-style: none;"  v-for="programa of programas">
                <img class="card-img-top w-100 d-block" style="border-radius: 20px;border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;" :src="programa.imagen || 'placeholder.png'"> 
                <div class="card-body" style="margin: 10px">
                    <h4 class="card-title">{{programa.titulo}}</h4>
                    <small>{{moment(programa.fecha).locale('es').format("D MMM YYYY")}}</small>
                </div>
            </div>
            <!--<div class="card"><img class="card-img-top w-100 d-block" :src=programa.imagen>
                <div class="card-body">
                    <i class="material-icons">local_movies</i>
                    <h4 class="card-title">{{programa.titulo}}</h4>
                    <small>{{programa.fecha}}</small>
                </div>
            </div>
            <div class="card"><img class="card-img-top w-100 d-block" :src=programa.imagen>
                <div class="card-body">
                    <i class="material-icons">local_movies</i>
                    <h4 class="card-title">{{programa.titulo}}</h4>
                    <small>{{programa.fecha}}</small>
                </div>
            </div>
            <div class="card"><img class="card-img-top w-100 d-block" :src=programa.imagen>
                <div class="card-body">
                    <i class="material-icons">local_movies</i>
                    <h4 class="card-title">{{programa.titulo}}</h4>
                    <small>{{programa.fecha}}</small>
                </div>
            </div>-->
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
            addPrograma(){
                fetch('/programas',{
                    method: 'POST',
                    body: JSON.stringify(this.programa),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type':'application/json'
                    }
                })
                .then(res=> res.json())
                .then(data => this.getProgramas())
                //console.log(this.programa)
                this.programa=new Programa()
            },
            getProgramas(){
                fetch('/programas')
                    .then(res=> res.json())
                    .then(data => {
                        this.programas=data;
                    });
            },
            moment
        }
    }
</script>