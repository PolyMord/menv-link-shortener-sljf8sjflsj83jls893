<template>
  <div class="auth">
    <div class="row">
      <div class="col s6 offset-s3">
        <h1>Link shorter</h1>
        <div class="card blue darken-1">
          <div class="card-content white-text">
            <span class="card-title">Authentification</span>
            <div>
              <div class="input-field">
                <input
                  type="text"
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  class="yellow-input"
                  @change="changeHandler"
                />
                <label for="email">Email</label>
              </div>

              <div class="input-field">
                <input
                  type="password"
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  class="yellow-input"
                  @change="changeHandler"
                />
                <label for="password">Password</label>
              </div>
            </div>
            <div class="card-action">
              <button
                class="sign_in btn yellow darken-4"
                :disabled="loading"
                @click="loginHandler"
              >Sign In</button>
              <button
                class="btn grey lighten-1 black-text"
                :disabled="loading"
                @click="registerHandler"
              >Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',

  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),

  computed: {
    loading() {
      return this.$store.state.loading
    }
  },

  methods: {
    changeHandler() {
      this.form = {
        ...this.form,
        [event.target.name]: event.target.value
      }
    },

    async registerHandler() {
      try {
        const data = await this.$store.dispatch('request', {
          url: '/api/auth/register',
          method: 'POST',
          body: { ...this.form }
        })

        this.$message(data.message)
      } catch (e) {
        this.$message(e.message)
      }
    },

    async loginHandler() {
      try {
        const data = await this.$store.dispatch('request', {
          url: '/api/auth/login',
          method: 'POST',
          body: { ...this.form }
        })

        this.$store.commit('login', data)
        this.$router.push('/create')

        this.$message(data.message)
      } catch (e) {
        this.$message(e.message)
      }
    }
  },

  mounted() {
    window.M.updateTextFields()
  }
}
</script>

<style>
.sign_in {
  margin-right: 10px;
}
</style>
