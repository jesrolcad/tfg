<template>
    <div id="InsigniasShow">
        <div class="card mb-4">
        <div class="card-body text-center" >
            <font-awesome-icon icon="fa-solid fa-trophy" size="2xl" style="margin-bottom:2%" />
            <carousel :items-to-show="3">
                <slide v-for="insignia of insigniasALL" v-bind:key="insignia._id">
                    <table class="table">
                        <tr>
                            <img v-if="insignias.includes(insignia.nombre)" :src="insignia.insignia" style="width: 100px; height: 100px;">
                            <img v-else :src="insignia.insignia" style="width: 100px; height: 100px;opacity: 0.6; filter: grayscale(100%);">
                        </tr>
                        <tr v-if="insignias.includes(insignia.nombre)"><strong>{{insignia.nombre}}</strong></tr>
                        <tr v-else>{{insignia.nombre}}</tr>
                    </table>
                </slide>

                <template #addons>
                <navigation />
                <pagination  style="margin-right: 25px ;"/>
                </template>
            </carousel>
            <!-- <div class="containter">
                <div class="row">
                    <div class="col-3" v-for="insignia of insignias" v-bind:key="insignia._id">
                    <table class="table">
                        <tr>
                            <img :src="insignia.insignia" style="width: 100px; height: 100px">
                        </tr>
                        <tr>
                            {{insignia.nombre}}
                        </tr>
                    </table>
                    </div>
                </div>
            </div> -->

          </div>
        </div>
    </div>
</template>
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default{
    data() {
    return {
        baseURL: "http://localhost:5000",
        insignias: [],
        insigniasALL: []
        }
    },
    created(){
        this.getInsignias(),
        this.getInsigniasAll()
    },
    methods: {
        getInsignias() {
        fetch(this.baseURL + "/insignias/usuario", { headers: { 'Authorization': sessionStorage.getItem("token") } })
            .then(res => res.json())
            .then(data => {
            this.insignias = data;
            console.log(this.insignias);
            })
        },
        getInsigniasAll() {
        fetch(this.baseURL + "/insignias/all", { headers: { 'Authorization': sessionStorage.getItem("token") } })
            .then(res => res.json())
            .then(data => {
            this.insigniasALL = data;
            console.log(this.insigniasALL);
            })
        }
    },
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
}
</script>