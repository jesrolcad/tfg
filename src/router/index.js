import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
    {path:'/', name:'Home',component: Home},
    {path:'/programas', name:'Programas',component: () => import(/* webpackChunkName: "Programas" */'../views/Programas.vue')},
    //{path:'/programa', name:'Programa',component: () => import(/* webpackChunkName: "Programa" */'../views/ProgramaShow.vue')}
    {path:'/programa/:id', name:'Programa',component: () => import(/* webpackChunkName: "Programa" */'../views/ProgramaShow.vue')}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;