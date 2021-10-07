<template>
  <v-card
    rounded-xl
    :class="gradient === true ? 'grad-card' : 'det-card'"
    flat
    :outlined="gradient"
  >
    <v-card-title class="text-center">
      <span>
        {{ title }}
      </span>
    </v-card-title>
    <v-card-text>
      <span class="value-text">{{ value }}</span>
    </v-card-text>
    <v-card-actions>
      <span v-if="!gradient">{{ total }} Total</span>
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
  props: ['title', 'value', 'pathTo', 'total', 'iconName', 'gradient'],

  methods: {
    navigateTo(pathName) {
      this.$router.push({ name: pathName })
    },
  },
}
</script>
