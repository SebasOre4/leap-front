<template>
    <div class="leap-sidebar">
        <div class="bg-shapes">
            <div class="leap-circle wh1" style="top: -50%; left: -20%;"></div>
            <div class="leap-circle wh2" style="bottom: -10%; right: 0%;"></div>
            <div class="leap-circle wh3" style="top: 55%; left: 2%;"></div>
            <div class="leap-circle wh4" style="top: 68%; left: 9%;"></div>
            <div class="leap-circle wh5" style="top: 72.5%; left: 11.7%;"></div>
        </div>
        <div class="nav-icons">
            <div class="logo">Leap.</div>
            <div class="nav-item" v-for="r in routes[userX.apiUser.superadmin]">
                <router-link :to="{ name: r.name }" class="nav-icon-link">
                    <fa-icon :icon="`fa-solid fa-${r.icon}`" class="nav-icon"></fa-icon>
                </router-link>
            </div>
        </div>
        <nav class="nav-items">
            <div class="app-title">Leap App</div>
            <div class="nav-item" v-for="r in routes[userX.apiUser.superadmin]">
                <router-link :to="{ name: r.name }" class="nav-link">
                    {{ r.label }}
                </router-link>
            </div>
            <div class="logout">
                <va-button @click="logout()" size="large" preset="secondary" color="#ffffff">
                    <fa-icon icon="fa-solid fa-arrow-right-to-bracket" class="btn-icon" />
                    Cerrar Sesión
                </va-button>
            </div>
        </nav>
    </div>
</template>
    
<script setup>
import { useRouter } from 'vue-router'
import { useRequesterStore } from '../../stores/requester';
import { useUserStore } from '../../stores/user';
import { useUtilsStore } from '../../stores/utils';

const router = useRouter()
const requesterX = useRequesterStore();
const utilsX = useUtilsStore();
const userX = useUserStore();

const routes = [
    [
        {
            name: 'home',
            label: 'Dashboard',
            icon: 'home'
        },
        {
            name: 'reports',
            label: 'Reportes',
            icon: 'chart-line'
        },
        {
            name: 'patients',
            label: 'Pacientes',
            icon: 'children'
        },
        {
            name: 'treatments',
            label: 'Tratamientos',
            icon: 'stethoscope'
        }
    ],
    [
        {
            name: 'sa-home',
            label: 'Dashboard',
            icon: 'home'
        },
        {
            name: 'sa-reports',
            label: 'Reportes',
            icon: 'chart-line'
        },
    ]
]

async function logout() {
    try {
        const { data } = await requesterX.Get({
            route: "/logout",
            withAuth: true
        });
        if (data.success) {
            utilsX.setNotif({
                title: "Cierre de Sesión",
                message: "Cierre de Sesión Exitoso!",
                type: "success",
                timeVisible: 3,
                position: "top-center",
            });
            userX.setApiUser(null);
            router.push({ name: "login" });
        }
    } catch (error) {
        utilsX.setNotif({
            title: "Cierre sesión",
            message: "Algo salio mal :/",
            type: "error",
            timeVisible: 3,
            position: "top-center",
        });
    }
}
</script>
    
<style lang="scss" src="./style.scss"></style>