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
        <div v-if="currentTab === 0">Tab 1</div>
        <div v-if="currentTab === 1">Tab 2</div>
        <div v-if="currentTab === 2">Tab 3</div>
        <div v-if="currentTab === 3">Tab 4</div>
        <div v-if="currentTab === 4">Tab 5</div>
    </div>
</template>
  
<script setup>
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();

const availableTabs = ref([
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
])

const currentTab = ref(tabIndex(route.query.tab))

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

function tabIndex(tabLabel) {
    const index = availableTabs.value.findIndex((el) => el.id === tabLabel);
    return index >= 0 ? index : 0;
}
</script>

<style lang="scss" src="./style.scss" scoped></style>