<template>
    <Navbar style="margin-bottom: 10%" />
    <div class="Estadisticas">
        {{listas}}
        <div> <Bar style="width:50%;height: 50%;margin-top:90px;margin-bottom:30px;" :chart-data="chartListasUsuario"/> {{mediaListasUsuario}}</div>
        <div> <Bar style="width:50%;height: 50%;margin-top:90px;margin-bottom:30px;" :chart-data="chartListasProgramas"/>{{mediaListasProgramas}}</div>

        <div>{{edadGenero}}</div>
        <div>{{edadTipoProg}}</div>
        
        <h1>Dashboard</h1>
        <div class="usuarios" style="margin-bottom:30px;">
            <div class="row">
                <div class="col" style="justify-content: space-evenly;">
                    <h1>{{usuarios.total}}</h1><h5>Usuarios</h5>
                </div>
                <div class="col-8" style="justify-content: space-evenly;">
                <table class="table center">
                    <tr>
                        <Line style="width:60%;height: 60%;margin-top:90px;margin-bottom:30px;" :chart-data="chartDataUser" />
                    </tr>
                    <tr>
                        <h5>Evolución de usuarios por mes</h5>
                    </tr>
                </table>
                </div>
            </div>
        </div>
        <div class="puntuaciones" style="margin-bottom:30px;">
            <div class="row">
                <div class="col" style="justify-content: space-evenly;">
                    <h2>{{puntuaciones.puntuados}}</h2><h3>Programas Puntuados</h3>
                </div>
                <div class="col-8" style="justify-content: space-evenly;">
                    <h2>{{puntuaciones.puntuaciones}}</h2><h3>Puntuaciones Totales</h3>
                </div>
            </div>
        </div>
        <div class="insignias" style="margin-bottom:30px;">
            <Pie style="width:35%;height: 35%;" :chart-data="chartInsignias" />
        </div>
        <div class="programas" style="margin-bottom:30px;">
            <div class="row">
                <div class="col" style="justify-content: space-evenly;">
                    <h2>{{programas}}</h2><h3>Programas</h3>
                </div>
                <div class="col-8" style="justify-content: space-evenly;">
                    <Doughnut style="width:40%;height: 40%;" :chart-data="chartDataPie" />
                </div>
            </div>
        </div>
        <Bar style="width:65%;height: 10%;margin-top:90px" :chart-data="chartDataGeneros" />
    </div>
    <Footer />
</template>
<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import { Pie } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, BarElement, LinearScale, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, BarElement, LineElement, LinearScale,PointElement)
export default {
    data() {
        return {
            baseURL: "http://localhost:5000",
            contador:[],
            usuarios:[],
            programas:[],
            generos:[],
            insignias:[],
            puntuaciones:[],
            listasUsuarios:[],
            mediaListasUsuario:[],
            listasProgramas:[],
            mediaListasProgramas:[],
            listas:[],
            edadTipoProg:[],
            edadGenero:[],
            chartDataPie: {},
            chartDataUser:{},
            chartDataGeneros:{},
            chartInsignias:{},
            chartListasUsuario:{},
            chartListasProgramas:{},
            chartEdadTipoProg:{},
            chartEdadGenero:{}
        }
    },
    created(){
        this.getPieActores()
        this.getProgramas()
        this.getUsuariosMes()
        this.getGenerosPrograma()
        this.getPuntuaciones()
        this.getPieInsignias()
        this.getListasUsuarios()
        this.getProgramasLP()
        this.getEdadMediaGenero()
        this.getTipoProgramaEdad()
    },
    methods:{
        async getPieActores() {
            await fetch(this.baseURL+'/estadisticas/pie-actores',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.contador = data;
                });
            this.chartDataPie= {
                labels: Object.keys(this.contador),
                datasets: [
                    {
                    backgroundColor: ['#2F8F9D', '#82DBD8'],
                    data: Object.values(this.contador)
                    }
                ]
            }
        },
        async getProgramas() {
            await fetch(this.baseURL+'/estadisticas/programas',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.programas = data['Programas'];
                });
        },
        async getUsuariosMes() {
            await fetch(this.baseURL+'/estadisticas/usuarios-mes',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.usuarios = data;
                });
            this.chartDataUser={
                labels: this.usuarios.meses,
                datasets: [
                    {
                    label: 'Número de usuarios registrados',
                    backgroundColor: '#242F9B',
                    data: this.usuarios.count
                    }
                ]
            }
        },
        async getGenerosPrograma() {
            await fetch(this.baseURL+'/estadisticas/generos',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.generos = data;
                });
            this.chartDataGeneros={
                labels: this.generos.generos,
                datasets: [
                    {
                    label: "Nº de programas por Género",
                    backgroundColor: ['#ef6ea0', '#ef996a', '#ecca5b', '#e6ea8c',
                                    '#123365', '#615aad', '#20a0d8', '#20dad8',
                                    '#deefed', '#b7edce', '#1b3c1d', '#2f5428',
                                    '#507838', '#7fab4e', '#c0ec6a', '#6e1a2d',
                                    '#962c30', '#cd4d36', '#ff8846', '#ffd24b',
                                    '#ff4548', '#ff872c', '#ff872c', '#fffd7b',
                                    '#c96dff', '#ff57f4', '#ff93c9'],
                    data: this.generos.count
                    }
                ]
            }
        },
        async getPuntuaciones() {
            await fetch(this.baseURL+'/estadisticas/puntuaciones',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.puntuaciones = data;
                });
        },
        async getPieInsignias() {
            await fetch(this.baseURL+'/estadisticas/insignias',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.insignias = data;
                });
            this.chartInsignias= {
                labels: this.insignias.insignias,
                datasets: [
                    {
                    backgroundColor: ['#6867AC', '#A267AC', '#A267AC', '#CE7BB0', '#FFBCD1',
                                        '#B983FF','#94B3FD', '#94DAFF', '#99FEFF', '#87AAAA',
                                        '#C8E3D4', '#F6EABE', '#FFD3B4', '#FFAAA7','#FF7171'],
                    data: this.insignias.count
                    }
                ]
            }
        },
        async getListasUsuarios() {
            await fetch(this.baseURL+'/estadisticas/listas',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.listasUsuarios = data;
                    this.listas= this.listasUsuarios.listas;
                    this.mediaListasUsuario= this.listasUsuarios.media;
                });
            let labels= []
            let data= []
            for(let i = 0; i < this.listasUsuarios.listasUsuarios.length;i++){
                let chart = this.listasUsuarios.listasUsuarios[i];
                console.log(chart)
                labels.push(chart['_id']+" Listas Personalizadas");
                data.push(chart['nUsuarios']);
            }
            this.chartListasUsuario= {
                labels: labels,
                datasets: [
                    {
                    label: 'Número de usuarios',
                    backgroundColor: ['#6867AC', '#A267AC', '#A267AC', '#CE7BB0', '#FFBCD1',
                                        '#B983FF','#94B3FD', '#94DAFF', '#99FEFF', '#87AAAA',
                                        '#C8E3D4', '#F6EABE', '#FFD3B4', '#FFAAA7','#FF7171'],
                    data: data
                    }
                ]
            }
        },
        async getEdadMediaGenero() {
            await fetch(this.baseURL+'/estadisticas/edad-genero',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.edadGenero = data;
                });
            /*this.chartInsignias= {
                labels: this.insignias.insignias,
                datasets: [
                    {
                    backgroundColor: ['#6867AC', '#A267AC', '#A267AC', '#CE7BB0', '#FFBCD1',
                                        '#B983FF','#94B3FD', '#94DAFF', '#99FEFF', '#87AAAA',
                                        '#C8E3D4', '#F6EABE', '#FFD3B4', '#FFAAA7','#FF7171'],
                    data: this.insignias.count
                    }
                ]
            }*/
        },
        async getProgramasLP() {
            await fetch(this.baseURL+'/estadisticas/listas-programas',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.listasProgramas = data;
                    this.mediaListasProgramas= this.listasProgramas.media;
                });
            let labels= []
            let data= []
            for(let i = 0; i < this.listasProgramas.listasProgramas.length;i++){
                let chart = this.listasProgramas.listasProgramas[i];
                labels.push(chart['_id']+" Programas");
                data.push(chart['numListas']);
            }
            this.chartListasProgramas= {
                labels: labels,
                datasets: [
                    {
                    label: 'Número de listas',
                    backgroundColor: ['#6867AC', '#A267AC', '#A267AC', '#CE7BB0', '#FFBCD1',
                                        '#B983FF','#94B3FD', '#94DAFF', '#99FEFF', '#87AAAA',
                                        '#C8E3D4', '#F6EABE', '#FFD3B4', '#FFAAA7','#FF7171'],
                    data: data
                    }
                ]
            }
        },
        async getTipoProgramaEdad() {
            await fetch(this.baseURL+'/estadisticas/edad-programa',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.edadTipoProg = data;
                });
            /*this.chartInsignias= {
                labels: this.insignias.insignias,
                datasets: [
                    {
                    backgroundColor: ['#6867AC', '#A267AC', '#A267AC', '#CE7BB0', '#FFBCD1',
                                        '#B983FF','#94B3FD', '#94DAFF', '#99FEFF', '#87AAAA',
                                        '#C8E3D4', '#F6EABE', '#FFD3B4', '#FFAAA7','#FF7171'],
                    data: this.insignias.count
                    }
                ]
            }*/
        },
    },
    components: { Footer, Navbar, Line, Doughnut, Bar, Pie}
}
</script>