import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
    {path:'/', name:'Home',component: Home},
    {path:'/programas', name:'Programas',component: () => import(/* webpackChunkName: "Programas" */'../views/Programas.vue'), meta: {auth: true}},
    {path:'/sugerencias', name:'Sugerencias',component: () => import('../views/Sugerencias.vue'), meta: {auth: true}},
    //{path:'/programa', name:'Programa',component: () => import(/* webpackChunkName: "Programa" */'../views/ProgramaShow.vue')}
    {path:'/programa/:id', name:'Programa',component: () => import(/* webpackChunkName: "Programa" */'../views/ProgramaShow.vue'), meta: {auth: true}},
    {path: '/login', name:'Login', component: () => import(/* webpackChunkName: "Programa" */'../views/Login.vue'), meta: {auth: false}},
    {path: '/registro', name:'Registro', component: () => import('../views/Registro.vue'), meta: {auth: false}},
    {path:'/actor/:id', name:'Actor',component: () => import(/* webpackChunkName: "Programa" */'../views/ActorShow.vue'), meta: {auth: true}},
    {path: '/perfil', name:'Perfil', component: () => import(/* webpackChunkName: "Programa" */'../views/Perfil.vue'), meta: {auth: true}},
    {path: '/estadisticas', name:'Estadisticas', component: () => import(/* webpackChunkName: "Programa" */'../views/Estadisticas.vue'), meta: {auth: true, role: true}},
    {path: '/buscador', name:'Buscador', component: () => import(/* webpackChunkName: "Programa" */'../views/Buscador.vue'), meta: {auth: true, role: true}}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token');

    let role = sessionStorage.getItem('role');
    if (role == "Admin"){
        role=true;
    }else{
        role=false;
    }

    if('auth' in to.meta && to.meta.auth && !token){ //Si se quiere acceder a una ruta que requiere autenticación y no hay token
        next('/');
    }else if('auth' in to.meta && !to.meta.auth && token){ //Si no se requiere autenticación y hay token
        next('/programas');
    }else if('role' in to.meta && to.meta.role && !role){
        next('/programas');
    } else {
        next();
    }
});

export default router;