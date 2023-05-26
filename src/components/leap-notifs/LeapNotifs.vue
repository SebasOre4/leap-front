<template>
    <div
        :class="'leap-notif ' + utilsX.notif.type + ' ' + utilsX.notif.position + ' ' + (utilsX.notif.isVisible ? 'visible' : 'invisible')">
        <fa-icon v-if="utilsX.notif.type == 'info'" icon="fa-solid fa-circle-info" class="notif-icon" />
        <fa-icon v-if="utilsX.notif.type == 'warning'" icon="fa-solid fa-triangle-exclamation" class="notif-icon" />
        <fa-icon v-if="utilsX.notif.type == 'error'" icon="fa-solid fa-circle-xmark" class="notif-icon" />
        <fa-icon v-if="utilsX.notif.type == 'success'" icon="fa-solid fa-circle-check" class="notif-icon" />

        <div class="notif-info">
            <div class="title">{{ utilsX.notif.title }}</div>
            <div class="message">{{ utilsX.notif.message }}</div>
        </div>

        <fa-icon @click="closeNotif" icon="fa-solid fa-circle-xmark" class="notif-closer" />
    </div>
</template>
  
<script setup>
import { useUtilsStore } from '../../stores/utils';

const utilsX = useUtilsStore();

function closeNotif() {
    utilsX.closeNotif();
}

</script>

<style scoped lang="scss" src="./style.scss"></style>
  