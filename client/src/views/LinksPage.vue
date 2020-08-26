<template>
  <div class="links">
    <Loader v-if="loading" />
    <p v-else-if="!links.length">Nothing to see here</p>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Original</th>
            <th>Shortened</th>
            <th>Open</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(link, index) of links" :key="link._id">
            <td>{{ index + 1 }}</td>
            <td>{{ link.from }}</td>
            <td>{{ link.to }}</td>
            <td>
              <router-link :to="'/detail/' + link._id">Open</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
  name: 'Links',

  data: () => ({
    loading: true,
    links: []
  }),

  components: {
    Loader
  },

  methods: {
    async fetchLinks() {
      try {
        const token = this.$store.state.token

        const data = await this.$store.dispatch('request', {
          url: '/api/link',
          method: 'GET',
          body: null,
          headers: { Authorization: `Bearer ${token}` }
        })

        this.links = data
        this.loading = false
      } catch (e) {
        console.error(e)
      }
    }
  },

  mounted() {
    this.fetchLinks()
  }
}
</script>
