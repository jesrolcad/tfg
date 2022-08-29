<template>
    <div id="app">
        <router-view :key="$route.path"> </router-view>
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


