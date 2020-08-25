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
              <button class="sign_in btn yellow darken-4" :disabled="loading">
                Sign In
              </button>
              <button
                class="btn grey lighten-1 black-text"
                :disabled="loading"
                @click="registerHandler"
              >
                Sign Up
              </button>
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
    },
    loading: false,
    error: null
  }),

  methods: {
    changeHandler() {
      this.form = {
        ...this.form,
        [event.target.name]: event.target.value
      }
    },

    async registerHandler() {
      try {
        const data = await this.request('/api/auth/register', 'POST', {
          ...this.form
        })
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },

    async request(url, method = 'GET', body = null, headers = {}) {
      this.loading = true
      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, { method, body, headers })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong')
        }
        this.loading = false

        return data
      } catch (e) {
        this.loading = false
        this.error = e.message
        throw e
      }
    }
  },

  mounted() {}
}
</script>

<style>
.sign_in {
  margin-right: 10px;
}
</style>
