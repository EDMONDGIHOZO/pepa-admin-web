<template>
  <v-footer padless fixed>
    <v-card class="flex" flat tile color="primary">
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} —
        <strong>P E P A </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
