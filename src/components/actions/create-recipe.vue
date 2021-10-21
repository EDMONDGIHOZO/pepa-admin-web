<template>
  <div>
    <v-progress-linear
      color="primary"
      height="10"
      v-if="saving"
      indeterminate
      class="my-4"
    />
    <v-card outlined class="pa-4" color="secondary">
      <v-card-title>
        <p class="white--text">create new</p>
      </v-card-title>
      <v-card-text>
        <ValidationObserver>
          <div class="form-container">
            <v-form
              lazy-validation
              @submit.prevent="handleCreateRecipe"
              ref="recipeform"
            >
              <ValidationProvider name="name" rules="required">
                <v-text-field
                  v-model="recipe.name"
                  dense
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :error-messages="errors"
                  solo
                  background-color="white"
                  placeholder="ex: peanuts"
                  label="name"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="cook time" rules="required">
                <v-text-field
                  v-model="recipe.cook_time"
                  dense
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :error-messages="errors"
                  solo
                  type="number"
                  background-color="white"
                  placeholder="eg: 3"
                  label="cook time"
                  persistent-hint
                  hint="this must be in minutes"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="prep time" rules="required">
                <v-text-field
                  v-model="recipe.prep_time"
                  dense
                  type="number"
                  hint="this must be in minutes"
                  persistent-hint
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :error-messages="errors"
                  solo
                  background-color="white"
                  placeholder="eg: 3"
                  label="prep time"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="servings" rules="required">
                <v-text-field
                  v-model="recipe.servings"
                  dense
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :error-messages="errors"
                  solo
                  background-color="white"
                  placeholder="eg: 3"
                  label="servings"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="description" rules="required">
                <v-text-field
                  v-model="recipe.description"
                  dense
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :error-messages="errors"
                  solo
                  background-color="white"
                  placeholder="eg: for kids"
                  label="description"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="category" rules="required">
                <v-select
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :items="categories"
                  :error-messages="errors"
                  item-text="name"
                  item-value="id"
                  v-model="recipe.category_id"
                  label="category"
                  solo
                  background-color="white"
                  dense
                />
              </ValidationProvider>
              <v-list class="my-4" rounded elevation="2">
                <v-subheader>
                  Ingredients
                </v-subheader>
                <add-ing-to-recipe />
                <v-list-item
                  v-for="ing in temporaryIngredients"
                  :key="ing.ingredient_id"
                >
                  <v-list-item-avatar>
                    <v-img :src="ing.image_url" alt="icon" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="ing.name"></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="ing.quantity + ' ' + ing.unit_type"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon
                        small
                        color="red"
                        @click="removeIng(ing.ingredient_id)"
                      >
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-btn
                rounded
                color="white"
                class="primary--text"
                min-width="120"
                type="submit"
                block
              >
                save
              </v-btn>
            </v-form>
          </div>
        </ValidationObserver>
      </v-card-text>
    </v-card>
    <v-alert type="error" v-if="showErrors">
      <p v-for="e in errors" :key="e.field">{{ e.field }}{{ e.message }}</p>
    </v-alert>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import upload from '../../mixins/image-upload'
import selectFile from '../../mixins/image-upload'
import AddIngToRecipe from './add-ing-to-recipe.vue'
export default {
  name: 'CreateRecipe',
  mixins: [upload, selectFile],
  components: {
    ValidationObserver,
    ValidationProvider,
    AddIngToRecipe,
  },
  computed: {
    categories() {
      return this.$store.state.recipeCategory.all
    },
    temporaryIngredients() {
      return this.$store.state.ingredient.tempIngredients
    },
  },
  data: () => {
    return {
      loaded: false,
      saving: false,
      creationDialog: false,
      errors: [],
      showErrors: false,
      recipe: {
        name: '',
        description: '',
        prep_time: null,
        cook_time: null,
        servings: null,
        category_id: null,
        ingredients: [],
      },
    }
  },
  methods: {
    async handleCreateRecipe() {
      this.showErrors = false
      const valid_form = await this.$refs.recipeform.validate()
      if (valid_form) {
        // upload image first
        this.saving = true
        const imagedata = await this.upload()

        if (imagedata) {
          this.ingredient.image_url = imagedata.data.url
        }

        const formData = {
          name: this.recipe.name,
          description: this.recipe.description,
          prep_time: this.recipe.prep_time,
          cook_time: this.recipe.cook_time,
          servings: this.recipe.servings,
          category_id: this.recipe.category_id,
          ingreds: this.temporaryIngredients,
        }
        this.$store.dispatch('recipe/createRecipe', formData)
        this.saving = false
      }
    },
    removeIng(id) {
      this.$store.dispatch('ingredient/removeTempIngredient', id)
    },
  },
}
</script>
