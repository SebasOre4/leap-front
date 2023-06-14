<template>
    <va-scroll-container class="leap-body-dash" vertical size="large" color="secondary">
        <div class="sidebar-container">
            <LeapSideNav></LeapSideNav>
        </div>

        <div class="page-content">
            <LeapBreadcrumbs></LeapBreadcrumbs>
            <va-scroll-container class="leap-main-panel-container" vertical size="small" color="secondary">
                <div class="leap-main-panel">
                    <RouterView></RouterView>
                </div>
            </va-scroll-container>
        </div>
    </va-scroll-container>
</template>
    
<script setup>
import LeapSideNav from '@/components/leap-side-nav/LeapSideNav.vue';
import LeapBreadcrumbs from '@/components/leap-breadcrumbs/LeapBreadcrumbs.vue';
</script>