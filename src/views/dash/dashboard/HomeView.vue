<template>
    <div class="section-title">
        <div class="label">Mi dashboard</div>
    </div>
    <div class="dashboard-cards">
        <div class="dash-card">
            <div class="title">Estado de pacientes</div>
            <div class="w-100">
                <Pie v-if="patientsInTreatmentData" :data="patientsInTreatmentData" :options="options" />
            </div>
            <div class="w-100 center">
                <va-button :to="{ name: 'reports' }">Ver más gráficas</va-button>
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Tratamientos Activos</div>
            <div class="w-100">
                <Pie v-if="activeTreatmentsData" :data="activeTreatmentsData" :options="options" />
            </div>
            <div class="w-100 center">
                <va-button :to="{ name: 'reports' }">Ver más gráficas</va-button>
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Mis pacientes</div>
            <div class="img-prev-container">
                <va-image fit="contain" class="img-prev" src="/imgs/patients.png" lazy />
            </div>
            <div class="w-100 center">
                <va-button :to="{ name: 'patients' }">Ver Pacientes</va-button>
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Tratamientos Activos</div>
            <div class="img-prev-container">
                <va-image fit="contain" class="img-prev" src="/imgs/treatments.png" lazy />
            </div>
            <div class="w-100 center">
                <va-button :to="{ name: 'treatments' }">Ver tratamientos</va-button>
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Mis datos</div>
            <div class="img-prev-container">
                <va-image fit="contain" class="img-prev" src="/imgs/profile.png" lazy />
            </div>
            <div class="w-100 center">
                <va-button :to="{ name: 'profile' }">Editar perfil</va-button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement,
    CategoryScale,
    LinearScale, Title
} from 'chart.js';
ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement,
    CategoryScale,
    LinearScale);

import { ref, onBeforeMount } from 'vue';
import { Pie } from 'vue-chartjs';
import { useRequesterStore } from '@/stores/requester';

const requesterX = useRequesterStore();

const patientsInTreatmentData = ref(null);
const activeTreatmentsData = ref(null);
const dashData = ref(null);

const options = {
    responsive: true,
    maintainAspectRatio: false
}

async function getDashData() {
    const { data } = await requesterX.Get({
        route: `/dash-graphs`,
        withAuth: true
    });

    if (data) {
        dashData.value = data.data;
        console.log(data.data);
        prepareGraphs();
    }
}

function prepareGraphs() {
    patientsInTreatmentData.value = {
        labels: ['Dados de alta', 'En Tratamiento', 'Internados'],
        datasets: [
            {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                data: [dashData.value.patients.discharged, dashData.value.patients.inTreatCJ + dashData.value.patients.inTreatSJ, dashData.value.patients.interned]
            }
        ]
    }

    activeTreatmentsData.value = {
        labels: ['Tratamientos externos', 'Con juegos'],
        datasets: [
            {
                backgroundColor: ['#41B883', '#E46651'],
                data: [dashData.value.patients.inTreatSJ, dashData.value.patients.inTreatCJ]
            }
        ]
    }
}

onBeforeMount(async () => {
    await getDashData()
});
</script>

<style lang="scss" src="./style.scss"></style>