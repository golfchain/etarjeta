import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Jugar from "./views/Jugar.vue";
import AddTorneo from "./views/AddTorneo.vue";
import Fotos from "./views/Fotos.vue";
import Foto from "./views/Foto.vue";
import Hoyo from "./views/Hoyo.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/fotos/:idCampo', component: Fotos },
    { path: '/foto/:idCampo/:hoyo', component: Foto },
    { path: '/jugar/:id', component: Jugar },
    { path: '/addtorneo', component: AddTorneo },
    {
        path: '/hoyo/:idTorneo/:id',
        component: Hoyo,
    }]


export const router = createRouter({
    history: createWebHistory(),
    routes,
})
