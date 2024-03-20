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
            <RouterLink v-if="!authStore.isAuthenticated" to="/signin" class="dropdown-item">Sign In</RouterLink>
            <a v-else class="dropdown-item" @click="signOut">Sign out</a>
          </div>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { authUserStore } from '../stores/auth';
  import { RouterLink, useRouter } from 'vue-router';
  
  const authStore = authUserStore();
  const router = useRouter();
  const isDropdownOpen = ref(false);
  
  const userName = computed(() => {
    return authStore.user.name || 'Placeholder';
  });
  
  function openDropdown() {
    isDropdownOpen.value = true;
  }
  
  function closeDropdown() {
    isDropdownOpen.value = false;
  }
  
  async function signOut() {
    await authStore.handleSignOut();
    console.log('Signing out...');
    router.push('/signin'); // Redirect to the sign-in page after signing out
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
  