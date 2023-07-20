<template>
    <div class="denver-cards" v-if="!isBusy">
        <va-collapse v-for="treatment in treatments" v-model="treatment.opened" class="w-100 history-card"
            :header="getTitle(treatment)" solid color="info">
            <div class="card-detail denver-cards">
                <div class="denver-card">
                    <div class="title">Diagnóstico inicial</div>
                    <div class="w-100">
                        <Radar :data="treatment.initial_diagnosis.radarData" :options="options" />
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Observaciones (Personal - Social):</div>
                        <div class="w-100">{{ treatment.initial_diagnosis.denver_test.personalSocial.observations || "n/a"
                        }}</div>
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Observaciones (Motor Fino - Adaptativo):</div>
                        <div class="w-100">{{ treatment.initial_diagnosis.denver_test.motorFino.observations || "n/a" }}
                        </div>
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Observaciones (Lenguaje):</div>
                        <div class="w-100">{{ treatment.initial_diagnosis.denver_test.lenguaje.observations || "n/a" }}
                        </div>
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Observaciones (Motor Grande):</div>
                        <div class="w-100">{{ treatment.initial_diagnosis.denver_test.motorGrande.observations || "n/a" }}
                        </div>
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Recomendaciones:</div>
                        <div class="w-100">{{ treatment.initial_diagnosis.recomendations }}</div>
                    </div>
                </div>
                <div class="denver-card">
                    <div class="title">Diagnóstico final</div>
                    <div class="w-100">
                        <Radar :data="treatment.final_diagnosis.radarData" :options="options" />
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Observaciones (Personal - Social):</div>
                        <div class="w-100">{{ treatment.final_diagnosis.denver_test.personalSocial.observations || "n/a" }}
                        </div>
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Observaciones (Motor Fino - Adaptativo):</div>
                        <div class="w-100">{{ treatment.final_diagnosis.denver_test.motorFino.observations || "n/a" }}</div>
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Observaciones (Lenguaje):</div>
                        <div class="w-100">{{ treatment.final_diagnosis.denver_test.lenguaje.observations || "n/a" }}</div>
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Observaciones (Motor Grande):</div>
                        <div class="w-100">{{ treatment.final_diagnosis.denver_test.motorGrande.observations || "n/a" }}
                        </div>
                    </div>
                    <div class="form-group treatment-info">
                        <div class="form-label">Recomendaciones:</div>
                        <div class="w-100">{{ treatment.final_diagnosis.recomendations }}</div>
                    </div>
                </div>
                <div class="denver-card">
                    <div class="title">Tratamiento Externo</div>
                    <div class="w-100">
                        <div class="form-group treatment-info">
                            <div class="form-label">Tratamientos en Personal - Social:</div>
                            <div class="div"
                                v-for="treat in treatment.external_treatment.list.filter(x => x.topic === 'personalSocial')">
                                - {{ treat.description }}
                            </div>
                        </div>
                        <div class="form-group treatment-info">
                            <div class="form-label">Tratamientos en Motor Fino - Adaptativo:</div>
                            <div class="div"
                                v-for="treat in treatment.external_treatment.list.filter(x => x.topic === 'motorFino')">
                                - {{ treat.description }}
                            </div>
                        </div>
                        <div class="form-group treatment-info">
                            <div class="form-label">Tratamientos en Lenguaje:</div>
                            <div class="div"
                                v-for="treat in treatment.external_treatment.list.filter(x => x.topic === 'lenguaje')">
                                - {{ treat.description }}
                            </div>
                        </div>
                        <div class="form-group treatment-info">
                            <div class="form-label">Tratamientos en Motor Grande:</div>
                            <div class="div"
                                v-for="treat in treatment.external_treatment.list.filter(x => x.topic === 'motorGrande')">
                                - {{ treat.description }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="denver-card">
                    <div class="title">Motor Fino - Juegos</div>
                    <div class="w-100">

                    </div>
                </div>
            </div>
        </va-collapse>
    </div>
    <LeapPagination v-if="treatments.length > 0" :pagination="pagination" @new-page="newPage"></LeapPagination>
</template>
  
<script setup>
import LeapPagination from '@/components/leap-pagination/LeapPagination.vue';
import { ref, onBeforeMount, watch } from "vue";
import { useRequesterStore } from '@/stores/requester';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar } from 'vue-chartjs';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

const props = defineProps({
    patientId: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
})

const options = {
    responsive: true,
    maintainAspectRatio: false
};

const requesterX = useRequesterStore();

const treatments = ref([]);
const pagination = ref([]);
const currentPage = ref(1);
const isBusy = ref(false);

onBeforeMount(async () => {
    await getTreatments()
});

watch(
    () => currentPage.value,
    async (newPage) => {
        await getTreatments();
    }
);

function getTitle(treatment) {
    const startDate = new Date(treatment.initial_diagnosis.created_at).toLocaleDateString("es-ES", {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    const endDate = new Date(treatment.final_diagnosis.created_at).toLocaleDateString("es-ES", {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    return `Del ${startDate} al ${endDate}`;
}

async function getTreatments() {
    isBusy.value = true;

    const { data } = await requesterX.Get({
        route: `/treatment-history/${props.patientId}?page=${currentPage.value}`,
        withAuth: true
    });

    if (data) {
        treatments.value = data.data;
        calcRadarData();
        pagination.value = data.meta.links;
    }

    isBusy.value = false;
}

function calcRadarData() {
    treatments.value.forEach(element => {
        element.initial_diagnosis.radarData = {
            labels: ["Personal - Social", "Motor Fino - Adaptativo", "Lenguaje", "Motor Grande"],
            datasets: [
                {
                    label: 'Edad actual',
                    backgroundColor: 'rgba(120,40,356,0.2)',
                    borderColor: 'rgba(120,40,356,1)',
                    pointBackgroundColor: 'rgba(120,40,356,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(120,40,356,1)',
                    data: [props.age, props.age, props.age, props.age]
                },
                {
                    label: 'Edad detectada',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [
                        element.initial_diagnosis.denver_test.personalSocial.detectedAge,
                        element.initial_diagnosis.denver_test.motorFino.detectedAge,
                        element.initial_diagnosis.denver_test.lenguaje.detectedAge,
                        element.initial_diagnosis.denver_test.motorGrande.detectedAge
                    ]
                },
                {
                    label: 'Edad en el diagnóstico',
                    backgroundColor: '#00cc4420',
                    borderColor: '#00cc44',
                    pointBackgroundColor: '#00cc44',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00cc44',
                    data: [
                        element.initial_diagnosis.evaluated_age,
                        element.initial_diagnosis.evaluated_age,
                        element.initial_diagnosis.evaluated_age,
                        element.initial_diagnosis.evaluated_age
                    ]
                }
            ]
        }
        element.final_diagnosis.radarData = {
            labels: ["Personal - Social", "Motor Fino - Adaptativo", "Lenguaje", "Motor Grande"],
            datasets: [
                {
                    label: 'Edad actual',
                    backgroundColor: 'rgba(120,40,356,0.2)',
                    borderColor: 'rgba(120,40,356,1)',
                    pointBackgroundColor: 'rgba(120,40,356,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(120,40,356,1)',
                    data: [props.age, props.age, props.age, props.age]
                },
                {
                    label: 'Edad detectada',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [
                        element.final_diagnosis.denver_test.personalSocial.detectedAge,
                        element.final_diagnosis.denver_test.motorFino.detectedAge,
                        element.final_diagnosis.denver_test.lenguaje.detectedAge,
                        element.final_diagnosis.denver_test.motorGrande.detectedAge
                    ]
                },
                {
                    label: 'Edad en el diagnóstico',
                    backgroundColor: '#00cc4420',
                    borderColor: '#00cc44',
                    pointBackgroundColor: '#00cc44',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00cc44',
                    data: [
                        element.final_diagnosis.evaluated_age,
                        element.final_diagnosis.evaluated_age,
                        element.final_diagnosis.evaluated_age,
                        element.final_diagnosis.evaluated_age
                    ]
                }
            ]
        }
    });
    console.log(treatments.value);
}


function newPage(page) {
    if (page.includes('Previous')) {
        currentPage.value--;
    } else if (page.includes('Next')) {
        currentPage.value++;
    } else {
        currentPage.value = page * 1;
    }
}

onBeforeMount(async () => {
    await getTreatments();
});
</script>

<style lang="scss" src="./style.scss" scoped></style>