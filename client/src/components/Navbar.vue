<template>
  <nav>
    <div class="nav-wrapper blue darken-1">
      <ul id="nav-mobile" class="right">
        <li>
          <router-link to="/create">Create</router-link>
        </li>
        <li>
          <router-link to="/links">Links</router-link>
        </li>
        <li>
          <a href="/" @click="logoutHandler">Sign Out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    logout() {
      return this.$store.commit('logout')
    }
  },

  methods: {
    logoutHandler() {
      this.logout()
    }
  }
}
</script>