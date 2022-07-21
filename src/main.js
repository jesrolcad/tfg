import { createApp } from 'vue'
import App from './App.vue';
import router from "./router/index";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faList, faUser, faEye, faBookmark, faPlus, faTrashCan, faCheck} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faList, faUser, faEye, faBookmark, faPlus, faTrashCan, faCheck)

const options = {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true

}


createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(Toast, options).mount('#app')


