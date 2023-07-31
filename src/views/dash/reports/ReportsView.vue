<template>
    <div class="section-title">
        <div class="label">Reportería</div>
    </div>
    <div class="dashboard-cards">
        <div class="dash-card w-100">
            <div class="title">Tratamientos Finalizados</div>
            <div class="w-100" style="height: 40vh;">
                <Bar v-if="diagnosesInYear" :data="diagnosesInYear" :options="options" />
            </div>
            <div class="w-100 center">
                <va-button>Exportar datos</va-button>
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Estado de pacientes</div>
            <div class="w-100">
                <Pie v-if="patientsInTreatmentData" :data="patientsInTreatmentData" :options="options" />
            </div>
            <div class="w-100 center">
                <va-button>Exportar datos</va-button>
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Tratamientos Activos</div>
            <div class="w-100">
                <Pie v-if="activeTreatmentsData" :data="activeTreatmentsData" :options="options" />
            </div>
            <div class="w-100 center">
                <va-button>Exportar datos</va-button>
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Tratamientos finalizados en el año</div>
            <div class="w-100" style="height: 250px;">
                <Bar v-if="treatmentsInYear" :data="treatmentsInYear" :options="options" />
            </div>
            <div class="w-100 center">
                <va-button>Exportar datos</va-button>
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Pacientes ingresados en el año</div>
            <div class="w-100" style="height: 250px;">
                <Bar v-if="patientsInYear" :data="patientsInYear" :options="options" />
            </div>
            <div class="w-100 center">
                <va-button>Exportar datos</va-button>
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
import { Pie, Bar } from 'vue-chartjs';
import { useRequesterStore } from '@/stores/requester';

const requesterX = useRequesterStore();

const patientsInTreatmentData = ref(null);
const activeTreatmentsData = ref(null);
const treatmentsInYear = ref(null);
const patientsInYear = ref(null);
const dashData = ref(null);
const diagnosesInYear = ref(null);

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

    treatmentsInYear.value = {
        labels: dashData.value.treatmentsInYear.map(data => data.month_year),
        datasets: [
            {
                label: 'Tratamientos en el año',
                backgroundColor: '#f87979',
                data: dashData.value.treatmentsInYear.map(data => data.count)
            }
        ]
    }

    patientsInYear.value = {
        labels: dashData.value.patientsInYear.females.map(data => data.month_year),
        datasets: [
            {
                label: 'Niñas tratadas en el año',
                backgroundColor: '#f87979',
                data: dashData.value.patientsInYear.females.map(data => data.count)
            },
            {
                label: 'Niños tratados en el año',
                backgroundColor: '#00D8FF',
                data: dashData.value.patientsInYear.males.map(data => data.count)
            }
        ]
    }

    let labels = {};

    if (dashData.value.diagnosesInYear.initial.length > dashData.value.diagnosesInYear.final.length) {
        dashData.value.diagnosesInYear.initial.forEach(element => {
            labels[element.month_year] = "";
        });
    } else {
        dashData.value.diagnosesInYear.final.forEach(element => {
            labels[element.month_year] = "";
        });
    }

    diagnosesInYear.value = {
        labels: Object.keys(labels),
        datasets: [
            {
                label: 'Inicial Normal',
                backgroundColor: '#4c0082',
                data: dashData.value.diagnosesInYear.initial.filter(data => data.result === "Normal").map(data => data.count),
                stack: 'Stack 0'
            },
            {
                label: 'Inicial Dudoso',
                backgroundColor: '#8e21db',
                data: dashData.value.diagnosesInYear.initial.filter(data => data.result === "Dudoso").map(data => data.count),
                stack: 'Stack 0'
            },
            {
                label: 'Inicial Anormal',
                backgroundColor: '#b854ff',
                data: dashData.value.diagnosesInYear.initial.filter(data => data.result === "Anormal").map(data => data.count),
                stack: 'Stack 0'
            },
            {
                label: 'Final Normal',
                backgroundColor: '#8c004b',
                data: dashData.value.diagnosesInYear.final.filter(data => data.result === "Normal").map(data => data.count),
                stack: 'Stack 1'
            },
            {
                label: 'Final Dudoso',
                backgroundColor: '#c9207a',
                data: dashData.value.diagnosesInYear.final.filter(data => data.result === "Dudoso").map(data => data.count),
                stack: 'Stack 1'
            },
            {
                label: 'Final Anormal',
                backgroundColor: '#f23f9f',
                data: dashData.value.diagnosesInYear.final.filter(data => data.result === "Anormal").map(data => data.count),
                stack: 'Stack 1'
            },
        ]
    }
}

onBeforeMount(async () => {
    await getDashData()
});
</script>

<style lang="scss" src="./style.scss"></style>