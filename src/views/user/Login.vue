<template>
  <v-container id="auth-container">
    <v-card outlined shaped max-width="450">
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="primary accent-4"
      ></v-progress-linear>
      <v-row class="pa-5">
        <v-col
          cols="12"
          class="pa-2 d-flex justify-center align-center flex-column"
        >
          <v-img width="70" class="my-4" :src="logo"></v-img>
          <p class="title-r">Staff Dashboard - login</p>
        </v-col>
        <v-col cols="12" v-if="showMessage">
          <v-alert border="top" :color="alert_color" dark>
            {{ message }}
          </v-alert>
        </v-col>

        <v-col cols="12">
          <ValidationObserver ref="obs">
            <div class="auth-container" slot-scope="{ invalid, validated }">
              <v-form lazy-validation @submit.prevent="handleLogin">
                <ValidationProvider name="email" rules="required|email">
                  <v-text-field
                    slot-scope="{ errors, valid }"
                    v-model="user.email"
                    :error-messages="errors"
                    :success="valid"
                    placeholder="example@pepa.com"
                    filled
                    dense
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="password" rules="required|min:6">
                  <v-text-field
                    slot-scope="{ errors, valid }"
                    v-model="user.password"
                    :error-messages="errors"
                    :success="valid"
                    placeholder="your password"
                    filled
                    type="password"
                    dense
                  ></v-text-field>
                </ValidationProvider>
                <v-btn
                  color="primary"
                  @click="handleLogin"
                  :disabled="invalid || !validated"
                  depressed
                  rounded
                  block
                >
                  Login
                </v-btn>
              </v-form>
            </div>
          </ValidationObserver>

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
import { mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'Login',
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      valid: true,
      loading: false,
      message: '',
      showMessage: false,
      alert_color: 'red',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'password is required'],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    logo() {
      return this.$store.state.app.logo
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: 'dashboard-home' })
    }
  },
  methods: {
    ...mapActions(['logIn']),
    // //   handle authentication
    async handleLogin() {
      const valid_form = await this.$refs.obs.validate()
      if (valid_form) {
        // check if the user is from pepa staff
        if (!this.user.email.includes('pepa.com')) {
          alert('you must be one of the staff')
        } else {
          this.loading = true
          const userData = {
            email: this.user.email,
            password: this.user.password,
          }
          try {
            await this.$store.dispatch('auth/login', userData)
            this.navigate('dashboard-home')
          } catch (error) {
            this.message = error
            this.loading = false
            this.showMessage = true
          }
        }
      }
    },
    //   auth navigation functions
    navigate: function (name) {
      router.push({ name: name })
    },
  },
}
</script>
