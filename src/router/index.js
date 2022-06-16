import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Programas from '../views/Programas.vue'

const routes = [
    {path:'/', name:'Home',component: Home},
    {path:'/programas', name:'Programas',component: Programas}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;