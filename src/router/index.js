import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
    {path:'/', name:'Home',component: Home},
    {path:'/programas', name:'Programas',component: () => import(/* webpackChunkName: "Programas" */'../views/Programas.vue'), meta: {auth: true}},
    {path:'/programas-buscados', name:'ProgramasBuscados',component: () => import(/* webpackChunkName: "Programas" */'../views/ProgramasBuscados.vue'), meta: {auth: true}},
    {path:'/sugerencias', name:'Sugerencias',component: () => import('../views/Sugerencias.vue'), meta: {auth: true}},
    //{path:'/programa', name:'Programa',component: () => import(/* webpackChunkName: "Programa" */'../views/ProgramaShow.vue')}
    {path:'/programa/:id', name:'Programa',component: () => import(/* webpackChunkName: "Programa" */'../views/ProgramaShow.vue'), meta: {auth: true}},
    {path: '/login', name:'Login', component: () => import(/* webpackChunkName: "Programa" */'../views/Login.vue'), meta: {auth: false}},
    {path: '/registro', name:'Registro', component: () => import('../views/Registro.vue'), meta: {auth: false}},
    {path:'/actor/:id', name:'Actor',component: () => import(/* webpackChunkName: "Programa" */'../views/ActorShow.vue'), meta: {auth: true}},
    {path: '/perfil', name:'Perfil', component: () => import(/* webpackChunkName: "Programa" */'../views/Perfil.vue'), meta: {auth: true}}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token');

    if('auth' in to.meta && to.meta.auth && !token){ //Si se quiere acceder a una ruta que requiere autenticación y no hay token
        next('/login');

    } else if('auth' in to.meta && !to.meta.auth && token){ //Si no se requiere autenticación y hay token
        next('/');

    } else {
        next();
    }

    let modalBackground = document.querySelector('.modal')
    if (modalBackground) {
        modalBackground.remove()
    }else{
        next()
    }
});

export default router;