<template>
    <va-scroll-container class="leap-crumbs-container" horizontal size="small" color="secondary">
        <va-breadcrumbs class="leap-crumbs">
            <va-breadcrumbs-item v-for="crumb in route.meta.breadCrumb" v-bind:key="crumb.label"
                :label="crumb.label == 'leap-item-detail' ? utilsX.crumbDetail : crumb.label" :to="crumb.to ?? null" />
        </va-breadcrumbs>
    </va-scroll-container>
</template>
  
<script setup>
import { useRoute } from 'vue-router';
import { useUtilsStore } from '../../stores/utils';

const utilsX = useUtilsStore();
const route = useRoute()
</script>

<style lang="scss" src="./style.scss"></style>
  