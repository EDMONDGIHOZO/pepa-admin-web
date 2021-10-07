<template>
  <v-container id="auth-container">
    <v-card outlined shaped>
      <v-row class="pa-5">
        <v-col
          cols="12"
          class="pa-2 d-flex justify-center align-center flex-column"
        >
          <v-img width="70" class="my-4" :src="logo"></v-img>
          <p class="title-r">Staff Member Login</p>
        </v-col>
        <v-col cols="12" v-if="showMessage">
          <v-alert border="top" :color="alert_color" dark>
            {{ message }}
          </v-alert>
        </v-col>

        <v-col cols="12">
          <v-form @submit.prevent="loggin_user">
            <div class="auth-container">
              <v-text-field
                label="Email"
                placeholder="example@pepa.com"
                type="text"
                v-model="user.email"
                :rules="emailRules"
                filled
                dense
              />
              <v-text-field
                label="password"
                placeholder="* * * * * "
                type="password"
                v-model="user.password"
                 :rules="passwordRules"
                filled
                dense
              />
              <v-btn
                depressed
                color="primary"
                block
                rounded
                type="submit"
                large
              >
                login
              </v-btn>
            </div>
          </v-form>
          <div class="request-box">
            <a
              href="mailto:admin@pepa.com?subject=Request for password change"
              class="text-center"
            >
              request for password reset
            </a>
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
      showMessage: false,
      alert_color: 'red',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'password is required',
      ],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    logo() {
      return this.$store.state.app.logo
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
      this.showMessage = !this.showMessage
      this.loading = true
      //   skip the validation
      if (this.user.email !== '' && this.user.password !== '') {
        this.$store.dispatch('auth/login', this.user).then(
          (response) => {
            if (response.success === true) {
              this.alert_color = 'success'
              this.message = response.message
              //   check user role before
              this.checkUser()
            } else {
              this.loading = false
              this.message = response.message
              this.showMessage = true
            }
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

    checkUser() {
      console.log('checked')
    },

    //   auth navigation functions
    navigate: function (name) {
      router.push({ name: name })
    },
  },
}
</script>
