<template>
  <div class="container">
    <v-row wrap v-if="singleLoaded">
      <v-col cols="12">
        <div class="title-row d-flex justify-start flex-row align-center">
          <h2>{{ recipe.name }}</h2>
          <v-chip
            class="mx-2"
            :color="recipe.active ? 'success' : 'accent'"
            outlined
          >
            {{ recipe.active ? 'live' : 'draft' }}
          </v-chip>
        </div>
        <v-col cols="12">
          <h3 class="my-5">Quick actions</h3>
          <v-sheet class="title-row d-flex justify-start flex-row align-center">
            <v-btn
              @click="feature"
              color="accent"
              rounded
              depressed
              small
              :loading="adding"
            >
              <v-icon left dark>
                mdi-star
              </v-icon>
              add to featured
            </v-btn>
            <recipe-form
              :recipedetails="recipe"
              @on-submit="updateRecipe"
              actionName="edit"
            />
            <v-btn color="primary" rounded depressed small @click="approve">
              <v-icon left dark>
                mdi-checkbox-marked-circle
              </v-icon>
              update status
            </v-btn>
          </v-sheet>
        </v-col>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>
            Description
          </v-card-title>
          <v-card-text>
            {{ recipe.description }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>
            ingredients
          </v-card-title>
          <v-card-text>
            <v-simple-table v-if="recipe.ingredients.length >= 1">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      quantity
                    </th>
                    <th class="text-left">
                      remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in recipe.ingredients" :key="item.id">
                    <td>{{ item.ingredient.name }}</td>
                    <td>{{ item.quantity }} {{ item.ingredient.unit_type }}</td>
                    <td>
                      <v-btn icon color="red">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div v-else>
              <h3>no ingredients on this recipe</h3>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import addFeaturedItem from '../../mixins/add-featured'
import RecipeForm from '../../components/forms/recipe-form.vue'
export default {
  props: ['recipe_id'],
  mixins: [addFeaturedItem],
  components: {
    'recipe-form': RecipeForm,
  },
  name: 'RecipeView',
  data: () => ({
    loaded: true,
  }),

  watch: {
    recipe_id: function (newVal, oldVal) {
      // watch it
      if (newVal !== oldVal) {
        this.initialize()
      }
    },
  },

  computed: {
    recipe() {
      return this.$store.state.recipe.recipe
    },
    adding() {
      return this.$store.state.Featureds.adding
    },
    singleLoaded() {
      return this.$store.state.recipe.singleLoaded
    },
  },
  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      //   fetch the data
      this.$store.dispatch('recipe/getRecipe', this.recipe_id)
    },

    async feature() {
      const info = {
        item_id: this.recipe.id.toString(),
        type: 'recipes',
        name: this.recipe.name,
      }
      await this.addFeaturedItem(info)
    },

    async approve() {
      // check if this recipe has ingredients

      if (this.recipe.ingredients.length !== 0) {
        const inputs = {
          active: !this.recipe.active,
          id: this.recipe.id,
        }
        this.$store.dispatch('recipe/approveRecipe', inputs)
      } else {
        alert('this recipe must have atleast one ingredient')
      }
    },

    async updateRecipe(RecipeForm) {
      let updateIngredients = this.$store.state.ingredient.tempIngredients
      //   let updateIngredients = this.recipe.ingredients.concat(
      //     this.$store.state.ingredient.tempIngredients,
      //   )
      const formdata = {
        id: this.recipe.id,
        name: RecipeForm.name,
        description: RecipeForm.description,
        cook_time: RecipeForm.cook_time,
        prep_time: RecipeForm.prep_time,
        category_id: RecipeForm.category_id,
        servings: RecipeForm.servings,
        ingreds: updateIngredients,
      }
      this.$store.dispatch('recipe/updateRecipe', formdata)
    },
  },
}
</script>
