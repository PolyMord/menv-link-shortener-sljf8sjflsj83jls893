<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Auth</router-link>|
      <router-link to="/create">Create</router-link>|
      <router-link to="/links">Links</router-link>|
      <router-link to="/links/:id">Detail</router-link>|
    </div>
    <router-view />
  </div>
</template>
