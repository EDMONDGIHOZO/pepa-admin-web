<template>
  <v-container id="auth-container">
    <v-card outlined>
      <v-row class="pa-5">
        <v-col cols="12">
          <p class="title-r">Staff Member Login</p>
        </v-col>
        <v-col cols="12">
          <div class="auth-container">
            <v-text-field
              label="Email"
              placeholder="example@pepa.com"
              type="text"
              v-model="user.email"
              filled
              dense
            />
            <v-text-field
              label="password"
              placeholder="* * * * * "
              type="password"
              v-model="user.password"
              filled
              dense
            />
            <v-btn
              depressed
              color="primary"
              block
              rounded
              @click="loggin_user"
              large
            >
              login
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import router from '../../router'
export default {
  name: 'Login',

  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      loading: false,
      message: '',
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.navigate('dashboard-home')
    }
  },
  methods: {
    //   handle authentication
    loggin_user() {
      this.loading = true
      //   skip the validation
      if (this.user.email !== '' && this.user.password !== '') {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.navigate('dashboard-home')
          },
          (error) => {
            this.loading = false
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString()
          },
        )
      }
    },
    //   auth navigation functions
    navigate: function (name) {
      router.push({ name: name })
    },
  },
}
</script>
