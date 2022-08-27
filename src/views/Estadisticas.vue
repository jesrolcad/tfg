<template>
    <Navbar style="margin-bottom: 10%" />
    <div class="Estadisticas">
        <h1 style="margin-left: 4%">Panel de Estadísticas <font-awesome-icon icon="fas fa-chart-column" /> </h1>
        <div class="usuarios" style="margin-bottom:30px;">
            <div class="card text-center" style="margin:2%">
                <div class="card-header">
                    <h5>Informe Usuarios</h5>
                </div>
                <div class="row" >
                    <div class="col">
                        <div class="card border-start border-info border-5 shadow" style="margin:5%">
                            <div><h1>{{usuarios.total}}</h1></div>
                            <div><h5>Usuarios</h5></div>
                        </div>
                    </div>
                    <div class="col-8" style="justify-content: space-evenly;">
                        <table class="table center justify-content-center" style="vertical-align: middle;">
                            <tr>
                                <Line style="width:80%;height: 80%;padding-left:20%" :chart-data="chartDataUser" />
                            </tr>
                            <tr>
                                <h5>Evolución de usuarios por mes</h5>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="programas" style="margin-bottom:30px;">
            <div class="card text-center" style="margin:2%">
                    <div class="card-header">
                        <h5>Informe Programas y Actores</h5>
                    </div>
                <div class="card-body">
                <div class="row">
                    <div class="col" style="justify-content: space-evenly;">
                        <div class="card border-start border-info border-5 shadow" style="margin:5%">
                            <h2>{{programas}}</h2><h3>Programas</h3>
                        </div>
                    </div>
                    <div class="col-8" style="justify-content: space-evenly;">
                        <table class="table center justify-content-center" style="vertical-align: middle;">
                            <tr>
                                <Doughnut style="width:70%;height: 70%;padding-left:25%" :chart-data="chartDataPie" />
                            </tr>
                            <tr>
                                <h5>Actores vs Personajes</h5>
                            </tr>
                        </table>
                        
                    </div>
                </div>
                <div class="row">
                    <table class="table center justify-content-center" style="vertical-align: middle;">
                        <tr>
                            <Bar style="width:80%;height: 20%;margin-top:90px;padding-left:20%" :chart-data="chartDataGeneros" />
                        </tr>
                        <tr>
                            <h5>Nº Programas por Género</h5>
                        </tr>
                    </table>
                </div>
                </div>
            </div>
        </div>
        <div class="listas" style="margin-bottom:30px;">
            <div class="card text-center" style="margin:2%">
                <div class="card-header">
                    <h5>Informe Listas Personalizadas</h5>
                </div>
                <div class="row">
                    <div class="col" style="justify-content: space-evenly;">
                        <div class="card border-start border-info border-5 shadow" style="margin:5%">
                            <h2>{{listas}}</h2><h3>Listas personalizadas</h3>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col" style="justify-content: space-evenly;">
                        <div class="card border-start border-info border-5 shadow" style="margin:5%">
                            <h2>{{mediaListasUsuario}}</h2><h3>Media Listas por Usuario</h3>
                        </div>
                    </div>
                    <div class="col-8" style="justify-content: space-evenly;">
                    <table class="table center justify-content-center" style="vertical-align: middle;">
                        <tr>
                            <Bar style="width:90%;height: 90%;margin-top:90px;margin-bottom:30px; padding-left:30%" :chart-data="chartListasUsuario"/>
                        </tr>
                        <tr>
                            <h5 style="margin-left:20%">Nº de listas por usuario</h5>
                        </tr>
                    </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col" style="justify-content: space-evenly;">
                        <div class="card border-start border-info border-5 shadow" style="margin:5%">
                            <h2>{{mediaListasProgramas}}</h2><h3>Media Programas en Listas</h3>
                        </div>
                    </div>
                    <div class="col-8" style="justify-content: space-evenly;">
                    <table class="table center justify-content-center" style="vertical-align: middle;">
                        <tr>
                            <Bar style="width:90%;height: 90%;margin-top:90px;margin-bottom:30px; padding-left:30%" :chart-data="chartListasProgramas"/>
                        </tr>
                        <tr>
                            <h5 style="margin-left:25%">Nº de programas en listas personalizadas</h5>
                        </tr>
                    </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col" style="justify-content: space-evenly;">
                    <table class="table center justify-content-center" style="vertical-align: middle;">
                        <tr>
                            <apexchart type="bar" style="width:90%;height: 90%;margin-top:90px;margin-bottom:30px;padding-left:5%"  :options="options" :series="chartEdadTipoProg" :key="listas"></apexchart>
                        </tr>
                        <tr>
                            <h5>Tipos de Programas Vistos por Edad</h5>
                        </tr>
                    </table>
                    </div>
                    <div class="col" style="justify-content: space-evenly;">
                    <table class="table center justify-content-center" style="vertical-align: middle;">
                        <tr>
                            <Bar style="width:90%;height: 90%;margin-top:90px;margin-bottom:30px;padding-left:8%" :chart-data="chartEdadGenero"/>
                        </tr>
                        <tr>
                            <h5>Edad Media por Género</h5>
                        </tr>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="puntuaciones" style="margin-bottom:30px;">
            <div class="card text-center" style="margin:2%">
                <div class="card-header">
                    <h5>Informe Puntuaciones</h5>
                </div>
                <div class="row">
                    <div class="col" style="justify-content: space-evenly;">
                        <div class="card border-start border-info border-5 shadow" style="margin:5%">
                            <div><h2>{{puntuaciones.puntuados}}</h2></div>
                            <div><h3>Programas Puntuados</h3></div>
                        </div>
                    </div>
                    <div class="col" style="justify-content: space-evenly;">
                        <div class="card border-start border-info border-5 shadow" style="margin:5%">
                            <div> <h2>{{puntuaciones.puntuaciones}}</h2></div>
                            <div><h3>Puntuaciones Totales</h3></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="insignias" style="margin-bottom:30px;">
            <div class="card text-center" style="margin:2%">
                <div class="card-header">
                    <h5>Informe Insignias</h5>
                </div>
                <div class="row">
                    <div class="col" style="justify-content: space-evenly;">
                        <div class="card border-start border-info border-5 shadow" style="margin:5%">
                            <h2>{{insigniasAcum}}</h2><h3>Insignias usuarios</h3>
                        </div>
                    </div>
                    <div class="col-8" style="justify-content: space-evenly;">
                    <table class="table center justify-content-center" style="vertical-align: middle;">
                        <tr>
                            <Pie style="width:80%;height: 80%; padding-left:20%" :chart-data="chartInsignias" />
                        </tr>
                        <tr>
                            <h5>Nº de usuarios por insignia</h5>
                        </tr>
                    </table>
                    </div>
                </div>
            </div>
        </div>
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
            baseURL: 'https://whattowatch-app.herokuapp.com',
            contador:[],
            usuarios:[],
            programas:[],
            generos:[],
            insignias:[],
            insigniasAcum:0,
            puntuaciones:[],
            listasUsuarios:[],
            mediaListasUsuario:[],
            listasProgramas:[],
            mediaListasProgramas:[],
            listas:[],
            edadTipoProg:[],
            edadGenero:[],
            options:[],
            chartDataPie: {},
            chartDataUser:{},
            chartDataGeneros:{},
            chartInsignias:{},
            chartListasUsuario:{},
            chartListasProgramas:{},
            chartEdadTipoProg:[],
            chartEdadGenero:{}
        }
    },
    created(){
        this.getTipoProgramaEdad()
        this.getPieActores()
        this.getProgramas()
        this.getUsuariosMes()
        this.getGenerosPrograma()
        this.getPuntuaciones()
        this.getPieInsignias()
        this.getListasUsuarios()
        this.getProgramasLP()
        this.getEdadMediaGenero()
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
            for(let i = 0; i < this.insignias.count.length; i++){
                this.insigniasAcum= this.insigniasAcum + this.insignias.count[i]
            }
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
            let labels= []
            let data= []
            for(let i = 0; i < this.edadGenero.length;i++){
                let chart = this.edadGenero[i];
                labels.push(chart['_id']);
                data.push(chart['edadMedia']);
            }
            this.chartEdadGenero= {
                labels: labels,
                datasets: [
                    {
                    label: 'Edad media',
                    backgroundColor: ['#6867AC', '#A267AC', '#A267AC', '#CE7BB0', '#FFBCD1',
                                        '#B983FF','#94B3FD', '#94DAFF', '#99FEFF', '#87AAAA',
                                        '#C8E3D4', '#F6EABE', '#FFD3B4', '#FFAAA7','#FF7171'],
                    data: data
                    }
                ]
            }
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
            let categories= Object.keys(this.edadTipoProg['result'])
            let pelis= []
            let series=[]
            let values=Object.values(this.edadTipoProg['result'])
            for(let i=0;i<values.length;i++) {
                pelis.push(values[i][0])
                series.push(values[i][1])
            }
            this.options={
                chart: {
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                        position: 'top',
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                        fontSize: '12px',
                        colors: ['#fff']
                    }
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['#fff']
                },
                tooltip: {
                    shared: true,
                    intersect: false
                },
                xaxis: {
                    categories: categories,
                }
            }
            this.chartEdadTipoProg=[{
                name: 'Películas',
                data: pelis
            }, {
                name: 'Series',
                data: series
            }]
        },
    },
    components: { Footer, Navbar, Line, Doughnut, Bar, Pie},
    mounted (){
        this.$nextTick(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }
}
</script>