<template>
    <div class="section-title">
        <div class="label">Tratamientos activos</div>
    </div>
    <va-button color="blue" class="filter-btn" @click="filter = !filter">
        <fa-icon class="btn-icon" icon="fa-solid fa-filter"></fa-icon> Buscar Tratamiento
    </va-button>
    <va-form ref="filter-form" class="filter-box" v-if="filter">
        <div class="form-group">
            <div class="form-label">Nombre</div>
            <va-input v-model="query.fullname" type="text" class="w-100"
                :rules="[(v) => optional(v) || stringBetween(v, 4, 100) || 'El campo debe tener entre 4 y 100 letras']" />
        </div>
        <div class="form-group">
            <div class="form-label">Historia Clínica</div>
            <va-input v-model="query.nhc" type="text" class="w-100"
                :rules="[(v) => optional(v) || onlyNums(v) || 'Ingrese solo números']"></va-input>
        </div>
        <va-button :loading="isBusy" :disabled="!isValid || isBusy" @click="validate() && getTreatments(true)" size="large"
            color="secondary" class="submit-btn">
            Buscar
        </va-button>
    </va-form>
    <div class="patients-list">
        <div v-for="treatment in treatments"
            :class="'patient-card ' + (treatment.patient.genre === 'M' ? 'male' : 'female')">
            <div class="data">
                <div class="main">
                    <b>{{ treatment.patient.fullname }}</b> ({{ treatment.patient.nickname }})
                </div>
                <div class="text">
                    <b>Diagnóstico inicial: </b>{{ treatment.initial_diagnosis.result }}
                </div>
                <div class="text">
                    <b>Historia Clínica: </b>{{ `HC-${treatment.patient.nhc}` }}
                </div>
                <div class="text">
                    <b>Genero: </b>{{ getGenre(treatment.patient.genre) }}
                </div>
                <div class="text">
                    <b>Fecha nacimiento: </b>{{ new Date(treatment.patient.birthday).toLocaleDateString("es-ES", {
                        year: 'numeric', month: 'long', day: 'numeric'
                    }) }}
                </div>
                <div class="text">
                    <b>Edad: </b>{{ `${getAge(treatment.patient.birthday).toFixed(2)} años o
                                        ${(getAge(treatment.patient.birthday) * 12).toFixed(2)} meses` }}
                </div>
                <div class="text">
                    <b>Estado: </b>{{ treatment.patient.state }}
                </div>
                <div class="text">
                    <b>Prediagnóstico: </b>{{ treatment.patient.prediagnosis }}
                </div>
                <div class="text">
                    <b>Recomendaciones: </b>{{ treatment.initial_diagnosis.recomendations }}
                </div>
            </div>
            <div class="actions">
                <va-button round color="primary" class="action-btn"
                    v-if="['En tratamiento CJ', 'En tratamiento SJ'].includes(treatment.patient.state)"
                    :to="{ name: 'patient-detail', params: { id: treatment.patient.id }, query: { tab: 'tratamiento' } }">
                    <fa-icon class="btn-icon" icon="fa-solid fa-file-waveform"></fa-icon> Ver detalles
                </va-button>
                <va-button round color="blue" class="action-btn"
                    v-if="['En tratamiento CJ', 'En tratamiento SJ'].includes(treatment.patient.state)"
                    :to="{ name: 'patient-detail', params: { id: treatment.patient.id }, query: { tab: 'dar-de-alta' } }">
                    <fa-icon class="btn-icon" icon="fa-solid fa-heart-pulse"></fa-icon> Dar de Alta
                </va-button>
            </div>
        </div>
    </div>
    <LeapPagination v-if="treatments.length > 0" :pagination="pagination" @new-page="newPage"></LeapPagination>
</template>
  
<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useRequesterStore } from '@/stores/requester';
import LeapPagination from '@/components/leap-pagination/LeapPagination.vue';
import { useForm } from 'vuestic-ui';
import { useValidator } from '@/composables/useValidator.js';

const { stringBetween, optional, onlyNums } = useValidator();
const { isValid, validate } = useForm('filter-form');
const requesterX = useRequesterStore();
const treatments = ref([]);
const pagination = ref([]);
const currentPage = ref(1);
const isBusy = ref(false);
const today = new Date();
const filter = ref(false);
const query = ref({
    fullname: null,
    nhc: null
})

onBeforeMount(async () => {
    await getTreatments()
});

watch(
    () => currentPage.value,
    async (newPage) => {
        await getTreatments();
    }
);

async function getTreatments(clear) {
    isBusy.value = true;

    if (clear) {
        currentPage.value = 1;
    }

    const { data } = await requesterX.Get({
        route: `/current-treatments?page=${currentPage.value}`,
        withAuth: true,
        params: query.value
    });

    console.log(data);

    if (data) {
        treatments.value = data.data;
        pagination.value = data.meta.links;
    }

    isBusy.value = false;
}

function getAge(birth) {
    const age = today - new Date(`${birth}T00:00:00`);
    return (age / (365.25 * 24 * 60 * 60 * 1000));
}

function getGenre(genre) {
    return genre === "F" ? "(F) Femenino" : "(M) Masculino";
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
</script>
  
<style lang="scss" src="./style.scss"></style>