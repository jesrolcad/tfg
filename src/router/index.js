import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
    {path:'/', name:'Home',component: Home},
    {path:'/programas', name:'Programas',component: () => import(/* webpackChunkName: "Programas" */'../views/Programas.vue')},
    //{path:'/programa', name:'Programa',component: () => import(/* webpackChunkName: "Programa" */'../views/ProgramaShow.vue')}
    {path:'/programa/:id', name:'Programa',component: () => import(/* webpackChunkName: "Programa" */'../views/ProgramaShow.vue')},
    {path: '/login', name:'Login', component: () => import(/* webpackChunkName: "Programa" */'../views/Login.vue')},
    {path: '/success', name:'Success', component: () => import('../views/Success.vue')}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;