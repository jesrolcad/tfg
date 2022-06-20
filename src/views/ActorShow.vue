<template>
<Navbar />
<div class="Actor">
    <h1>{{id}}</h1>
    <div style="margin: 35px;">
        <h1>Series</h1>
        <div class="table-responsive text-start border rounded border-light shadow">
            <table class="table table-borderless">
                <thead class="shadow-sm">
                    <tr class="shadow-sm">
                        <th class="shadow-sm" style="text-align: center;">Título</th>
                        <th class="shadow-sm" style="text-align: center;">Personaje</th>
                        <th class="shadow-sm" style="text-align: center;">Número Episodios</th>
                    </tr>
                </thead>
                <tbody v-for="personaje of personajes" :key="personaje.titulo_url">
                    <tr v-if="personaje.titulo_url.indexOf('/tv/')!== -1">
                        <td style="margin: 0;">{{personaje.titulo}}</td>
                        <td style="margin: 0;">{{personaje.personaje}}</td>
                        <td>{{personaje.num_episodios}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div style="margin: 35px;">
        <h1>Películas</h1>
        <div class="table-responsive text-start border rounded border-light shadow">
            <table class="table table-borderless">
                <thead class="shadow-sm">
                    <tr class="shadow-sm">
                        <th class="shadow-sm" style="text-align: center;">Título</th>
                        <th class="shadow-sm" style="text-align: center;">Personaje</th>
                    </tr>
                </thead>
                <tbody v-for="personaje of personajes" :key="personaje.titulo_url">
                    <tr v-if="personaje.titulo_url.indexOf('/movie/')!== -1">
                        <td style="margin: 0;">{{personaje.titulo}}</td>
                        <td style="margin: 0;">{{personaje.personaje}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<Footer />
</template>
<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
export default {
    data() {
        return{
            id: this.$route.params.id,
            personajes:[]
        }
    },
    created(){
        this.getPersonaje()
    },
    methods:{
        getPersonaje(){
            fetch('http://localhost:5000/actores/'+ this.id)
                .then(res=> res.json())
                .then(data => {
                    this.personajes=data;
                });
        }
    },components: {
        Navbar,
        Footer
    }
}
</script>