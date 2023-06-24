<template>
    <div class="section-title">
        <div class="label">Mi dashboard</div>
    </div>
</template>
  
<script setup>
import { useRoute } from 'vue-router';

const currentYear = new Date().getFullYear()
const route = useRoute()
</script>