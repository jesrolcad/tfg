<template>
<div>
    <h1>Hello World</h1>
    <nav class="navbar navbar-light bg-light">
        <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
        <div class="row pt-5" >
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="addPrograma">
                            <div class="form-group">
                                <input type="text" v-model="programa.tipo" placeholder="Inserta el tipo de programa"
                                class="from-control">
                            </div>
                            <div class="form-group">
                                <input type="text" v-model="programa.titulo" placeholder="Inserta un titulo"
                                class="from-control">
                            </div>
                            <div class="form-group">
                                <textarea cols="30" rows= "10" v-model="programa.descripcion" placeholder="Inserta una descripción"
                                class="from-control"></textarea>
                            </div>
                            <button class="btn btn-primary btn-block">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <!--<div><p>{{programas}}</p></div>-->
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Título</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="programa of programas">
                            <td>{{programa.tipo}}</td>
                            <td>{{programa.titulo}}</td>
                            <td>{{programa.descripcion}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</div>
</template>

<script>
    class Programa{
        constructor(tipo,titulo,descripcion){
            this.tipo=tipo;
            this.titulo=titulo;
            this.descripcion=descripcion;
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
                        console.log(this.programas);
                    });
            }
        }
    }
</script>