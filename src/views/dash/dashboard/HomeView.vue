<template>
    <div class="section-title">
        <div class="label">Mi dashboard</div>
    </div>
    <div class="dashboard-cards">
        <div class="dash-card">
            <div class="title">Pacientes en Tratamiento</div>
            <div class="w-100">
                <Bar :data="barChartData" :options="options" />
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Reportes</div>
            <div class="w-100">
                <Pie :data="pieChartData" :options="options" />
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Tratamientos Activos</div>
            <div class="w-100">
                <Pie :data="pieChartData" :options="options" />
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Pacientes tratados por semana</div>
            <div class="w-100">
                <Bar :data="barChartData" :options="options" />
            </div>
        </div>
        <div class="dash-card">
            <div class="title">Tratamientos Finalizados</div>
            <div class="w-100">
                <Pie :data="pieChartData" :options="options" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement,
    CategoryScale,
    LinearScale, Title
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'

ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement,
    CategoryScale,
    LinearScale)

const pieChartData = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
        }
    ]
}

const barChartData = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
    ]
}

const options = {
    responsive: true,
    maintainAspectRatio: false
}
</script>

<style lang="scss" src="./style.scss"></style>