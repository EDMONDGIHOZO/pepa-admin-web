<template>
  <v-form ref="form" lazy-validation @submit.prevent="$emit('on-submit', form)">
    <v-text-field
      v-model="form.name"
      :rules="isRequireRule"
      label="Name"
      required
      outlined
      dense
    ></v-text-field>

    <v-textarea
      v-model="form.description"
      label="Description"
      :rules="isRequireRule"
      auto-grow
      outlined
      required
    ></v-textarea>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      depressed
      type="submit"
      rounded
    >
      Save
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset" rounded depressed>
      clear
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'IngredientCategoryForm',
  props: {
    category: {
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      isRequireRule: [(v) => !!v || 'this field is required'],

      form: {
        name: this.category?.name || '',
        description: this.user?.description || '',
      },
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    handleSaving() {
      console.log('thefuck')
    },
  },
}
</script>
