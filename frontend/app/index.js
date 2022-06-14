import { createApp } from 'vue'
import App from './component/App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import Login from './component/Login.vue'


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [

        {path: '/login', name: 'Login', component: Login}
    ]
  });

/*new Vue({
    render: h => h(App)
}).$mount("#app");*/

createApp(App).use(router).mount('#app')