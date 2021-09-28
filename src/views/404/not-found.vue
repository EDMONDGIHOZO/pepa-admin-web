<template>
  <v-card class="ma-auto" flat max-width="344">
    <v-card-text>
      <div class="display-3 py-5 text-center">404 </div>
      <div class="text--primary">
        The page you are looking for, is not available
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="navigate('dashboard-home')">
        back to home
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    navigate(path) {
      this.$router.push({ name: path })
    },
  },
}
</script>
