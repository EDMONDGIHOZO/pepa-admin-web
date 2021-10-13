<template>
  <div justify="space-around">
    <v-dialog
      transition="dialog-top-transition"
      max-width="400"
      class="pa-4"
      v-model="showdialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="accent" v-bind="attrs" v-on="on" icon small>
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:default="showdialog">
        <v-sheet>
          <v-toolbar color="primary" elevation="0" class="white--text">
            Edit category details
            <v-spacer></v-spacer>
            <v-icon @click="showdialog.value = false" color="white">
              mdi-close
            </v-icon>
          </v-toolbar>
          <v-progress-linear v-if="loading" indeterminate color="orange" />
          <div class="pa-4">
            <ingredient-category-form
              @on-submit="handleEditing"
              :category="category"
            />
          </div>
        </v-sheet>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import UserService from '../../services/user-service'
import IngredientCategoryForm from '../../components/actions/ingredient-category-form.vue'
export default {
  name: 'editIngredientCategory',
  props: {
    category: {
      type: Object,
    },
  },
  components: { IngredientCategoryForm },
  data() {
    return {
      loading: false,
      showdialog: false,
    }
  },
  methods: {
    handleEditing(IngredientCategoryForm) {
      this.loading = true
      const formData = {
        name: IngredientCategoryForm.name,
        description: IngredientCategoryForm.description,
        id: this.category.id,
      }
      UserService.editEngCategory(formData)
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch('app/getIngeredientCategories')
            this.loading = false
            this.showdialog = false
          }
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    },
  },
}
</script>
