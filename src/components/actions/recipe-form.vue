<template>
  <div>
    <v-dialog v-model="dialog" width="600" eager>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary lighten-1"
          dark
          v-bind="attrs"
          v-on="on"
          depressed
          rounded
          class="mx-3"
          small
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          update details
        </v-btn>
      </template>

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
            <p class="white--text">edit recipe</p>
          </v-card-title>
          <v-card-text>
            <ValidationObserver>
              <div class="form-container">
                <v-form
                  ref="recipe"
                  lazy-validation
                  @submit.prevent="$emit('on-submit', recipe)"
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
                        <v-list-item-title
                          v-text="ing.name"
                        ></v-list-item-title>

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
                  <v-divider />
                  <v-list
                    class="my-4"
                    color="grey lighten-3"
                    rounded
                    v-if="actionName === 'edit'"
                  >
                    <v-subheader>
                      <v-icon class="mx-3">mdi-information</v-icon>
                      Current Recipe Ingredients
                    </v-subheader>
                    <v-list-item
                      v-for="ing in initialIngredients"
                      :key="ing.ingredient.ingredient_id"
                    >
                      <v-list-item-avatar>
                        <v-img :src="ing.ingredient.image_url" alt="icon" />
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="ing.ingredient.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="ing.quantity + ' ' + ing.ingredient.unit_type"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
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
    </v-dialog>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import upload from '../../mixins/image-upload'
import selectFile from '../../mixins/image-upload'
import AddIngToRecipe from './add-ing-to-recipe.vue'
export default {
  name: 'RecipeForm',
  mixins: [upload, selectFile],
  props: ['recipedetails', 'actionName'],
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
    initialIngredients() {
      return this.$store.state.ingredient.initialIngredients
    },
  },
  data() {
    return {
      dialog: false,
      loaded: false,
      saving: false,
      creationDialog: false,
      errors: [],
      showErrors: false,
      recipe: {
        name: this.recipedetails.name || '',
        description: this.recipedetails.description || '',
        prep_time: this.recipedetails.prep_time || null,
        cook_time: this.recipedetails.cook_time || null,
        servings: this.recipedetails.servings || null,
        category_id: this.recipedetails.category_id || null,
      },
    }
  },
  methods: {
    removeIng(id) {
      this.$store.dispatch('ingredient/removeTempIngredient', id)
    },
  },
}
</script>
