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
              label="Username"
              placeholder="enter your username"
              type="text"
              filled
              dense
            />
            <v-text-field
              label="password"
              placeholder="* * * * * "
              type="password"
              filled
              dense
            />
            <v-btn
              depressed
              color="primary"
              block
              rounded
              @click="navigate('dashboard-home')"
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
  methods: {
    //   auth navigation functions
    navigate: function (name) {
      router.push({ name: name })
    },
  },
}
</script>
