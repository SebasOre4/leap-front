<template>
    <div class="auth-bg">
      <div class="bg-shapes">
        <div class="leap-circle wh1" style="top: -55%; left: -5%;"></div>
        <div class="leap-circle wh1" style="bottom: -55%; right: -5%;"></div>
        <div class="leap-circle wh2" style="bottom: -10%; left: 15%;"></div>
        <div class="leap-circle wh2" style="top: -10%; right: 15%;"></div>
        <div class="leap-circle wh3" style="top: 55%; left: 2%;"></div>
        <div class="leap-circle wh3" style="bottom: 55%; right: 2%;"></div>
        <div class="leap-circle wh4" style="top: 68%; left: 9%;"></div>
        <div class="leap-circle wh4" style="bottom: 68%; right: 9%;"></div>
        <div class="leap-circle wh5" style="top: 72.5%; left: 11.7%;"></div>
        <div class="leap-circle wh5" style="bottom: 72.5%; right: 11.7%;"></div>
        <div class="leap-circle wh4" style="top: 0; left: 50%;"></div>
        <div class="leap-circle wh4" style="bottom: 0; right: 50%;"></div>
        <div class="leap-circle wh5" style="top: 5%; left: 49.5%;"></div>
        <div class="leap-circle wh5" style="bottom: 5%; right: 49.5%;"></div>
      </div>
      <va-scroll-container vertical size="large" color="primary">
        <router-view />
      </va-scroll-container>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const currentYear = new Date().getFullYear()
  const route = useRoute()
  </script>
  
  <style lang="scss" scoped>
  .auth-bg {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  
    .bg-shapes {
      position: absolute;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      z-index: -1;
  
      .leap-circle {
        position: absolute;
        content: '';
        background: white;
        opacity: 10%;
        border-radius: 50%;
  
        &.wh1 {
          width: 90vh;
          height: 90vh;
        }
  
        &.wh2 {
          width: 30vh;
          height: 30vh;
        }
  
        &.wh3 {
          width: 15vh;
          height: 15vh;
        }
  
        &.wh4 {
          width: 5vh;
          height: 5vh;
        }
  
        &.wh5 {
          width: 2vh;
          height: 2vh;
        }
      }
    }
  }
  </style>
  