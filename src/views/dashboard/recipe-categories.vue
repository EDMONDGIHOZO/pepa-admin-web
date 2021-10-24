<template>
  <div class="container">
    <!-- create category section -->
    <!-- view and crud categories section -->
    <v-row wrap>
      <v-col cols="12" md="8">
        <v-card outlined class="pa-4">
          <div class="row-title">
            <p>Recipe Categories</p>
          </div>
          <div>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      thumbnail
                    </th>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      recipes
                    </th>
                    <th class="text-left">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in categories" :key="item.name">
                    <td>
                      <v-avatar size="30">
                        <v-img :src="item.thumbnail" alt="thumb" />
                      </v-avatar>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td
                      class="d-flex flex-center justify-between flex-row align-center"
                    >
                      <delete-dialog
                        :itemId="item.id"
                        :name="item.name"
                        itemType="recipeCategory"
                      />
                      <v-btn
                        color="primary"
                        icon
                        small
                        @click="navigate(item.id)"
                      >
                        <v-icon small>mdi-eye</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined class="pa-4">
          <v-progress-linear indeterminate v-if="saving"></v-progress-linear>
          <div v-if="showMessage">
            <v-alert
              dense
              border="left"
              type="warning"
              v-for="error in errorMessages"
              :key="error.field"
            >
              <strong>{{ error.field }}</strong>
              is {{ error.rule }}
            </v-alert>
          </div>
          <div class="row-title">
            <p>new category</p>
          </div>
          <div>
            <category-form @on-submit="handleSaveCategory" ref="catform" />
          </div>
        </v-card>
        <v-snackbar v-model="showSingleMessage" multi-line color="primary">
          {{ message }}
          <template v-slot:action="{ attrs }">
            <v-btn
              :color="messageColor"
              text
              v-bind="attrs"
              @click="showSingleMessage = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CategoryForm from '../../components/actions/category-form.vue'
import deleteDialog from '../../components/dialogs/delete-dialog.vue'
import recipeCategoryService from '../../services/recipe-category.service'
export default {
  name: 'RecipeCategories',
  components: {
    CategoryForm,
    deleteDialog,
  },
  data() {
    return {
      valid: true,
      showMessage: false,
      showSingleMessage: false,
      message: '',
      errorMessages: [],
      messageColor: 'accent',
      saving: false,
      category: {
        name: '',
        description: '',
        image_url: '',
      },
      //   validators
      isRequireRule: [(v) => !!v || 'this field is required'],
    }
  },

  computed: {
    categories() {
      return this.$store.state.recipeCategory.all
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    navigate(id) {
      this.$router.push({ name: 'recipe-category', params: { catid: id } })
    },
    async handleSaveCategory(CategoryForm) {
      this.showMessage = false
      const formData = {
        name: CategoryForm.name,
        description: CategoryForm.description,
        thumbnail: CategoryForm.image_url,
      }
      this.saving = true
      //   //   save the category
      recipeCategoryService
        .create(formData)
        .then((response) => {
          if (response.status === 200) {
            this.saving = false
            this.message = 'the category is saved'
            this.showSingleMessage = true
            this.$store.dispatch('recipeCategory/getAll')
            this.$refs.catform.reset()
          } else {
            return {}
          }
        })
        .catch((error) => {
          // handle and customize this error here
          if (error) {
            this.saving = false
            if (error.response.status === 422) {
              this.errorMessages = error.response.data.errors
              this.saving = false
              this.showMessage = true
            }
          } else {
            this.message = 'an error occured, please check your internet'
            this.saving = false
            this.showSingleMessage = true
          }
        })
    },

    // updating
    async handleUpdateCategory(IngredientCategoryForm) {
      console.log('updating', IngredientCategoryForm)
    },
  },
}
</script>
