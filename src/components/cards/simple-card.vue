<template>
  <v-card rounded-xl class="mx-auto white--text grad-card" flat>
    <v-card-title>
      <span>
        {{ title }}
      </span>
      <v-spacer />
      <v-icon color="white">{{ iconName }}</v-icon>
    </v-card-title>
    <v-card-text>
      <span class="card-value-text">{{ value }}</span>
    </v-card-text>
    <v-card-actions>
      <span>{{ total }} Total</span>
      <v-spacer></v-spacer>
      <v-btn depressed rounded @click="navigateTo(pathTo)" icon>
        <v-icon color="white">
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'simpleCard',
  props: ['title', 'value', 'pathTo', 'total', 'iconName'],

  methods: {
    navigateTo(pathName) {
      this.$router.push({ name: pathName })
    },
  },
}
</script>
