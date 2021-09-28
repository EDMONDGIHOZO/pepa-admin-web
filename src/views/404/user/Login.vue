<template>
  <v-container id="auth-container">
    <v-row class="pa-5">
        <v-col cols="12">
            <p class="display-1">Staff Member Login</p>
        </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-text-field
          label="Username"
          placeholder="enter your username"
          type="text"
          filled
        />
        <v-text-field
          label="password"
          placeholder="* * * * * "
          type="password"
          filled
        />
        <v-btn
          depressed
          color="primary"
          block
          rounded
          @click="navigate('dashboard-home')"
        >
          login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '../../router'
export default {
  name: 'Login',
  methods: {
    //   auth navigation functions
    navigate: function (name) {
      router.push({ name: name })
    },
  },
}
</script>
