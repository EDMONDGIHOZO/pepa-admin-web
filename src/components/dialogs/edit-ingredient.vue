<template>
  <div justify="space-around">
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      class="pa-4"
      v-model="showdialog"
      overlay-opacity="1"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="accent" v-bind="attrs" v-on="on" icon small>
          <v-icon small>mdi-eye</v-icon>
        </v-btn>
      </template>
      <template v-slot:default="showdialog">
        <v-sheet>
          <v-toolbar color="primary" elevation="0" class="white--text">
            Edit {{ ingredientDetails.name }}
            <v-spacer></v-spacer>
            <v-icon @click="showdialog.value = false" color="white">
              mdi-close
            </v-icon>
          </v-toolbar>
          <v-alert border="left" color="indigo" dark v-if="showMessage">
            {{ message }}
          </v-alert>
          <v-progress-linear v-if="saving" indeterminate color="orange" />
          <div class="pa-4">
            <ingredient-form
              @on-submit="handleEditing"
              :ingredient="ingredientDetails"
            />
          </div>
        </v-sheet>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import ingredientService from '../../services/ingredient.service'
import IngredientForm from '../forms/ingredient-form.vue'
export default {
  name: 'editIngredient',
  components: {
    'ingredient-form': IngredientForm,
  },
  props: {
    ingredientDetails: {
      type: Object,
    },
  },

  data() {
    return {
      loading: false,
      showdialog: false,
      saving: false,
      message: '',
      showMessage: false,
    }
  },

  methods: {
    handleEditing(ingredientDetails) {
      this.saving = true
      const formData = {
        name: ingredientDetails.name,
        description: ingredientDetails.description,
        unit_price: ingredientDetails.unit_price,
        unit_type: ingredientDetails.unit_type,
        category_id: ingredientDetails.category_id,
        image_url: ingredientDetails.image_url,
      }

      ingredientService
        .update(formData, ingredientDetails.id)
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch('ingredient/getingredients')
            this.message = 'your updates are saved ✅'
            this.showMessage = true
            setTimeout((this.showdialog = false), 5000 * 20)
            this.saving = false
          } else {
            this.message = 'something went wrong , try again later'
            this.saving = false
            this.showMessage = true
          }
        })
        .catch((error) => {
          this.saving = false
          this.message = error
        })
    },
  },
}
</script>
