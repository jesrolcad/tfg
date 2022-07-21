<template>
<div class="Navbar">
    <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient" style="background: linear-gradient(120deg, #78D5F5 0%, #787FF6 24%, #4ADEDE 49%, #1CA7EC 75%, #1F2F98 100%);">
        <div class="container"><img src="../../public/logo.png" style="width: 70px;height: 70px;"><a class="navbar-brand logo" href="#" style="font-family:montserratbold;font-size: 25px;color: #ffffff;margin-left: 10px;border-color: #ffffff;"><strong>What To Watch</strong></a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navbarNav"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><router-link to="/"><span class="nav-link active" style="font-size: 20px; font-family: montserratbold;font-weight: normal !important;">Inicio</span></router-link></li>
                    <li class="nav-item"><router-link to="/programas"><span class="nav-link active" style="font-size: 20px; font-family: montserratbold;font-weight: normal !important;">Programas</span></router-link></li>
                    <li class="nav-item"><router-link to="/perfil"><span class="nav-link active" style="font-size: 20px; font-family: montserratbold;font-weight: normal !important;">Perfil</span></router-link></li>
                    <!-- <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#" style="font-size: 20px; font-family: montserratbold;"><span style="font-weight: normal !important;">Perfil</span></a>
                        <div class="dropdown-menu"><a class="dropdown-item" href="#">First Item</a><a class="dropdown-item" href="#">Second Item</a><a class="dropdown-item" href="#">Third Item</a></div>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</div>
</template>