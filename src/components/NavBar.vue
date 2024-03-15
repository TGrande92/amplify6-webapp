<template>
    <nav class="navbar">
      <RouterLink to="/" class="navbar-brand">Your Brand</RouterLink>
      <ul class="navbar-nav">
        <li><RouterLink to="/flight-tests">Flight Tests</RouterLink></li>
        <li><RouterLink to="/vehicles">Vehicles</RouterLink></li>
        <li><RouterLink to="/datapage">Data Page</RouterLink></li>
        <li><RouterLink to="/products">Products</RouterLink></li>
        <li><RouterLink to="/news">News</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
        <li class="nav-item dropdown" @mouseover="openDropdown" @mouseleave="closeDropdown">
          <a class="nav-link dropdown-toggle">{{ userName }}</a>
          <div class="dropdown-menu" v-show="isDropdownOpen">
            <RouterLink to="/profile" class="dropdown-item">Profile</RouterLink>
            <RouterLink to="/settings" class="dropdown-item">Settings</RouterLink>
            <RouterLink to="/signin" class="dropdown-item">Sign In</RouterLink>
            <a class="dropdown-item" @click="signOut">Sign Out</a>
          </div>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { authUserStore } from '../stores/auth'
  import { RouterLink } from 'vue-router';
  
  const authStore = authUserStore()
  // Replace this with your actual authentication logic
  console.log(authStore.user.name, '123')
  const userName = computed(() => {
  console.log('Computed userName being recalculated:', authStore.user.name);
  return authStore.user.name || 'Placeholder';
});
  const isDropdownOpen = ref(false);
  
  function openDropdown() {
    isDropdownOpen.value = true;
  }
  
  function closeDropdown() {
    isDropdownOpen.value = false;
  }
  
  function signOut() {
    // Implement your sign out logic here
    console.log('Signing out...');
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-nav {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  .navbar-nav li {
    padding: 0 10px;
  }
  
  .dropdown-menu {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-menu .dropdown-item {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .nav-item.dropdown:hover .dropdown-menu {
    display: block;
  }
  </style>
  