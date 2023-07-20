<template>
    <div class="section-title">
        <div class="label">Detalle de Paciente</div>
    </div>
    <va-tabs v-model="currentTab" class="leap-tabs">
        <template #tabs>
            <va-tab v-for="(tab, index) in availableTabs" :key="tab.label" :name="index">
                <fa-icon :icon="tab.icon" class="tab-icon"></fa-icon>
                {{ tab.label }}
            </va-tab>
        </template>
    </va-tabs>
    <div class="tab-detail">
        <div v-if="currentTab === getIndex('datos')">
            <PatientEditForm v-if="patientData" :patient="patientData" :patient-id="patientId"></PatientEditForm>
        </div>
        <div v-if="currentTab === getIndex('diagnosticar')">
            <DiagnosisForm v-if="patientData" :patient-id="patientId" @diagnosticated="updateView" :age="calcAge()*1"></DiagnosisForm>
        </div>
        <div v-if="currentTab === getIndex('tratamiento')">
            <TreatmentForm v-if="patientData" :age="calcAge(patientData.birthday)*1" :patient-id="patientId"></TreatmentForm>
        </div>
        <div v-if="currentTab === getIndex('dar-de-alta')">
            <DiagnosisForm v-if="patientData && patientData.current_treatment_id" :treatment-id="patientData.current_treatment_id"  :patient-id="patientId" :is-final-diagnosis="true" @diagnosticated="updateView" :age="calcAge()*1"></DiagnosisForm>
        </div>
        <div v-if="currentTab === getIndex('reportes')">
        </div>
        <div v-if="currentTab === getIndex('historial')">
            <TreatmentHistory v-if="patientData" :age="calcAge(patientData.birthday)*1" :patient-id="patientId"></TreatmentHistory>
        </div>
    </div>
</template>
  
<script setup>
import { watch, ref, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRequesterStore } from '@/stores/requester';
import DiagnosisForm from '@/components/patient/DiagnosisForm.vue';
import PatientEditForm from '@/components/patient/PatientEditForm.vue';
import TreatmentForm from '@/components/patient/TreatmentForm.vue';
import TreatmentHistory from '@/components/patient/TreatmentHistory.vue';

const requesterX = useRequesterStore();

const route = useRoute();

const router = useRouter();

const today = new Date();

const isBusy = ref(false);

const patientId = route.params.id;

const patientData = ref(null);

const tabs = [
    {
        label: 'Datos',
        id: 'datos',
        icon: 'fa-solid fa-pen'
    },
    {
        label: 'Diagnosticar',
        id: 'diagnosticar',
        icon: 'fa-solid fa-comment-medical'
    },
    {
        label: 'Tratamiento',
        id: 'tratamiento',
        icon: 'fa-solid fa-stethoscope'
    },
    {
        label: 'Dar de alta',
        id: 'dar-de-alta',
        icon: 'fa-solid fa-file-circle-check'
    },
    {
        label: 'Exportar reportes',
        id: 'reportes',
        icon: 'fa-solid fa-chart-line'
    },
    {
        label: 'Historial',
        id: 'historial',
        icon: 'fa-solid fa-clock-rotate-left'
    },
];

const availableTabs = computed(() => {
    if(['Internado'].includes(patientData.value?.state)){
        return [
            tabs[0],
            tabs[1],
            tabs[4],
            tabs[5]
        ];
    }
    if(['Dado de alta'].includes(patientData.value?.state)){
        return [
            tabs[0],
            tabs[1],
            tabs[4],
            tabs[5]
        ];
    }
    if(['En tratamiento CJ', 'En tratamiento SJ'].includes(patientData.value?.state)){
        return [
            tabs[0],
            tabs[2],
            tabs[3],
            tabs[4],
            tabs[5]
        ];
    }
})

const currentTab = ref(tabIndex(route.query.tab))

watch(
    () => availableTabs.value,
    (newAvailableTabs) => {
        currentTab.value = tabIndex(route.query.tab);
    }
);

watch(
    () => route.query.tab,
    (newTabLabel) => {
        currentTab.value = tabIndex(newTabLabel);
    }
);

watch(
    () => currentTab.value,
    (newTabIndex) => {
        router.push({
            name: route.name,
            query: { tab: availableTabs.value[newTabIndex].id },
        });
    }
);

async function updateView() {
    await getPatient();
    currentTab.value = 0;
}

function tabIndex(tabLabel) {
    const index = availableTabs.value?.findIndex((el) => el.id === tabLabel);
    return index >= 0 ? index : 0;
}

async function getPatient() {
    isBusy.value = true;

    const { data } = await requesterX.Get({
        route: `/patient/${patientId}`,
        withAuth: true
    });

    if (data) {
        data.data.birthday = new Date(`${data.data.birthday}T00:00:00`);
        data.data.crono_birthday && (data.data.crono_birthday = new Date(`${data.data.crono_birthday}T00:00:00`));
        patientData.value = data.data;
    }

    isBusy.value = false;
}

function calcAge(customAge = null){
    const age = today - (customAge || patientData.value.crono_birthday || patientData.value.birthday);
    return ((age / (365.25 * 24 * 60 * 60 * 1000))*12).toFixed(2);
}

function getIndex(id){
    return availableTabs.value?.findIndex((el) => el.id == id);
}

onBeforeMount(async () => {
    await getPatient();
});
</script>

<style lang="scss" src="./style.scss" scoped></style>