<template>
<div class="Navbar">
    <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient" style="background: linear-gradient(120deg, #78D5F5 0%, #787FF6 24%, #4ADEDE 49%, #1CA7EC 75%, #1F2F98 100%);">
        <div class="container"><img src="../../public/logo.png" style="width: 70px;height: 70px;"> <strong style="font-family:montserratbold;font-size: 25px;color: #ffffff;margin-left: 10px;border-color: #ffffff;">What To Watch</strong><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navbarNav"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><router-link to="/programas"><span class="nav-link active" style="font-size: 20px; font-family: montserratbold;font-weight: normal !important;">Programas</span></router-link></li>
                    <li class="nav-item"><router-link to="/buscador"><font-awesome-icon icon="fa-solid fa-magnifying-glass" style="height:22px;width:22px;margin-top:45%;color:#ffffff;transform: rotateY(180deg)" /></router-link></li>
                    <li v-if="rol == 'Admin'" class="nav-item"><router-link to="/estadisticas"><span class="nav-link active" style="font-size: 20px; font-family: montserratbold;font-weight: normal !important;">Estadisticas</span></router-link></li>
                    <li class="nav-item"><router-link to="/perfil"><span class="nav-link active" style="font-size: 20px; font-family: montserratbold;font-weight: normal !important;">Perfil</span></router-link></li>
                    <!-- <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#" style="font-size: 20px; font-family: montserratbold;"><span style="font-weight: normal !important;">Perfil</span></a>
                        <div class="dropdown-menu"><a class="dropdown-item" href="#">First Item</a><a class="dropdown-item" href="#">Second Item</a><a class="dropdown-item" href="#">Third Item</a></d)iv>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</div>
</template>
<script>
//import Buscador from './Buscador.vue'
export default {
    data(){
        return{
            rol: sessionStorage.getItem('role')
        }
    },
    created(){
        console.log(this.rol)
    },
    /*components:{
        Buscador,
    }*/
}
</script>
<style scoped>
.nav-item{
    margin-right:3%;
}
</style>