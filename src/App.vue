<template>
    <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/programas">Programas</router-link>
        <router-link to="/login">Iniciar sesión</router-link>
        <router-link to="/registro">Registro</router-link>
    </div>
    <div class="container">
        <router-view></router-view>
    </div>

</template>

<style>
@font-face {
    font-family: 'montserratbold';
    src: url('../public/assets/fonts/montserrat-bold-webfont.woff2') format('woff2'),
         url('../public/assets/fonts/montserrat-bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'abeezeeregular';
    src: url('../public/assets/fonts/abeezee-regular-webfont.woff2') format('woff2'),
         url('../public/assets/fonts/abeezee-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}
</style>


