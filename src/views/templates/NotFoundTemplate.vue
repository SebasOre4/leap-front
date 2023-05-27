<template>
    <va-scroll-container class="leap-body-dash" vertical size="large" color="secondary">
        <div class="notfound-content">
            <div class="num-error">404</div>
            <div class="error-title">Página no encontrada</div>
            <div class="error-description">Lo siento, la página a la que intentas acceder no existe</div>
            <va-button :to="{ name: 'home' }" size="large">Regresar al Inicio</va-button>
        </div>
    </va-scroll-container>
</template>
  
<script setup>
</script>
  