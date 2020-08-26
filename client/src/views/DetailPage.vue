<template>
  <div class="detail">
    <Loader v-if="loading" />
    <LinkCard v-else :link="link" />
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import LinkCard from '@/components/LinkCard'

export default {
  name: 'Detail',

  data: () => ({
    loading: true,
    link: null
  }),

  components: {
    Loader,
    LinkCard
  },

  methods: {
    async getLink() {
      try {
        const id = this.$route.params.id
        const token = this.$store.state.token

        const data = await this.$store.dispatch('request', {
          url: `/api/link/${id}`,
          method: 'GET',
          body: null,
          headers: { Authorization: `Bearer ${token}` }
        })

        this.link = data
        this.loading = false
      } catch (e) {
        console.error(e)
      }
    }
  },

  mounted() {
    this.getLink()
  }
}
</script>
