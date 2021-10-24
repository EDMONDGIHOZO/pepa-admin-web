<template>
  <div class="container">
    <!-- create category section -->
    <!-- view and crud categories section -->
    <v-row wrap>
      <v-col cols="12" md="8">
        <v-card outlined class="pa-4">
          <div class="row-title">
            <p>All Recipes</p>
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
                      description
                    </th>
                    <th class="text-left">
                      status
                    </th>
                    <th class="text-left">
                      time
                    </th>
                    <th class="text-left">
                      ingredients
                    </th>
                    <th class="text-left">
                      servings
                    </th>
                    <th class="text-left">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in recipes" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                      <v-chip
                        class="mx-2"
                        :color="item.active ? 'success' : 'accent'"
                        
                      >
                        {{ item.active ? 'live' : 'draft' }}
                      </v-chip>
                    </td>
                    <td>{{ item.cook_time + item.prep_time }} minutes</td>
                    <td v-if="item.ingredients">
                      {{ item.ingredients.length }}
                    </td>
                    <td v-else>no ingredients yet</td>
                    <td>{{ item.servings }}</td>

                    <td>
                      <v-btn
                        color="accent"
                        depressed
                        small
                        class="mr-2 white--text"
                        icon
                        @click="navigate(item.id)"
                      >
                        <v-icon small>mdi-eye</v-icon>
                      </v-btn>
                      <v-btn
                        color="red"
                        depressed
                        small
                        class="mr-2 white--text"
                        icon
                        @click="deleteRecipe(item.id)"
                      >
                        <v-icon small>mdi-delete</v-icon>
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
        <CreateRecipe />
      </v-col>
    </v-row>
    <v-progress-linear :active="isDeleting" color="accent" indeterminate />
  </div>
</template>

<script>
import CreateRecipe from '../../components/actions/create-recipe.vue'
export default {
  name: 'Recipes',
  data() {
    return {
      search: '',
      new_ingredient: {
        name: '',
        description: '',
        unit_type: '',
        unit_price: '',
        category_id: '',
        image_url: '',
      },
      imageName: '',
      imageFile: '',
      //   form validation
      valid: true,
      name: '',
      isRequired: [(v) => !!v || 'this field is required'],
      select: null,
      units: ['lg', 'l'],
      checkbox: false,
    }
  },
  components: {
    CreateRecipe,
  },
  computed: {
    recipes() {
      return this.$store.state.recipe.all
    },
    isDeleting() {
      return this.$store.state.recipe.isDeleting
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
      this.$router.push({ name: 'recipe', params: { recipe_id: id } })
    },

    deleteRecipe(id) {
      this.$store.dispatch('recipe/destroyRecipe', id)
    },

    onFilePicked(e) {
      // get the added files
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        // read the image
        let fr = new FileReader()
        fr.readAsDataURL(files[0])

        // ATTACH URL TO THE CATEGORY
        fr.addEventListener('load', () => {
          this.new_category.thumbnail = fr.result
          //console.log("imageUrl");
          this.imageFile = files[0] // this is an image file that can be sent to server...
          //this.getImages();
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.new_category.thumbnail = ''
      }
    },
  },
}
</script>
