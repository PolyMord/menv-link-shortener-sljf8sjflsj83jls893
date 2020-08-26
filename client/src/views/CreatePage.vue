<template>
  <div class="create">
    <div class="row">
      <div class="col s8 offset-s2">
        <div class="input-field">
          <input
            type="text"
            placeholder="Enter link"
            id="link"
            v-model="link"
            @keypress.enter="pressHandler"
          />
          <label for="email">Email</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',

  data: () => ({
    link: ''
  }),

  methods: {
    async pressHandler() {
      try {
        const data = await this.$store.dispatch('request', {
          url: '/api/link/generate',
          method: 'POST',
          body: { from: this.link },
          headers: { Authorization: `Bearer ${this.$store.state.token}` }
        })
        this.$router.push(`/detail/${data.link._id}`)
      } catch (e) {
        console.error(e)
      }
    }
  },

  mounted() {
    window.M.updateTextFields()
  }
}
</script>
