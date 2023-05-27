<template>
    <div class="login-container">
      <h1 class="login-title">{{ $t('underConstruction') }}</h1>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style lang="scss" scoped>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
  
    .login-title {
      font-size: 55px;
      color: white;
      margin-bottom: 40px;
      user-select: none;
    }
  
    .login-form {
      background-color: white;
      overflow: hidden;
      border-radius: 25px;
      width: 400px;
  
      .login-header {
        background-color: var(--leap-primary-color);
        padding: 15px;
  
        .logo {
          user-select: none;
          font-size: 23px;
          opacity: 0.6;
          color: white;
        }
      }
  
      .login-body {
        padding: 40px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        height: 300px;
  
        .btn-icon {
          margin-right: 10px;
        }
      }
    }
  }
  </style>