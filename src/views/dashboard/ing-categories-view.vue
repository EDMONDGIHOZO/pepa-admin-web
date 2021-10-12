<template>
  <div class="container">
    <!-- create category section -->
    <!-- view and crud categories section -->
    <v-row wrap>
      <v-col cols="12" md="8">
        <v-card outlined class="pa-4">
          <div class="row-title">
            <p>Ingredient Categories</p>
          </div>
          <div>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      ingredients
                    </th>
                    <th class="text-left">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in categories" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                    <td>
                      <v-btn
                        color="accent"
                        depressed
                        small
                        class="mr-2 white--text"
                        rounded
                      >
                        <v-icon small>mdi-pencil</v-icon>
                        edit
                      </v-btn>
                      <v-btn
                        color="red"
                        depressed
                        small
                        class="mr-2 white--text"
                        rounded
                      >
                        <v-icon small>mdi-delete</v-icon>
                        delete
                      </v-btn>
                      <v-btn
                        color="primary"
                        depressed
                        small
                        class="mr-2 white--text"
                        rounded
                      >
                        <v-icon small>mdi-eye</v-icon>
                        view
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
            <template>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="handleSaveCategory"
              >
                <v-text-field
                  v-model="category.name"
                  :rules="isRequireRule"
                  label="Name"
                  required
                  outlined
                  dense
                ></v-text-field>

                <v-textarea
                  v-model="category.description"
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
                  @click="handleSaveCategory"
                  depressed
                  rounded
                >
                  Save
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                  rounded
                  depressed
                >
                  clear
                </v-btn>
              </v-form>
            </template>
          </div>
        </v-card>
        <v-snackbar v-model="showSingleMessage" multi-line>
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
import userService from '../../services/user-service'
export default {
  name: 'IngCategoriesView',
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
      return this.$store.state.app.ingredients_categories
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    async handleSaveCategory() {
      const formData = {
        name: this.category.name,
        description: this.category.description,
        image_url: this.category.image_url,
      }

      //   save the category
      userService
        .createIngCategories(formData)
        .then((response) => {
          if (response.status === 200) {
            this.message = 'the category is saved'
            this.showSingleMessage = true
            setTimeout(
              (this.$store.dispatch('app/getIngeredientCategories'),
              this.reset()),
              4.0 * 1000,
            )
          }
        })
        .catch((error) => {
          // handle and customize this error here
          if (error) {
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
  },
}
</script>
