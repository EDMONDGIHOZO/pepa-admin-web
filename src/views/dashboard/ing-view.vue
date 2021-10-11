<template>
  <div class="container">
    <!-- create category section -->
    <!-- view and crud categories section -->
    <v-row wrap>
      <v-col cols="12" md="8">
        <v-card outlined class="pa-4">
          <div class="row-title">
            <p>All ingredients</p>
          </div>
          <div>
            <v-simple-table v-if="loaded">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      category
                    </th>
                    <th class="text-left">
                      unit price
                    </th>
                    <th class="text-left">
                      unit type
                    </th>
                    <th class="text-left">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in ingredients" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.category.name }}</td>
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.unit_type }}</td>
                    <td>
                      <v-btn
                        color="accent"
                        depressed
                        small
                        class="mr-2 white--text"
                        rounded
                        icon
                      >
                        <v-icon small>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        color="red"
                        depressed
                        small
                        class="mr-2 white--text"
                        rounded
                        icon
                      >
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn
                        color="primary"
                        depressed
                        small
                        class="mr-2 white--text"
                        rounded
                        icon
                      >
                        <v-icon small>mdi-eye</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <p v-else>0 ingredients</p>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <create-ingredient />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserService from '../../services/user-service'
import CreateIngredient from '@/components/actions/create-ingredient.vue'
export default {
  name: 'IngView',
  data() {
    return {
      search: '',
      loaded: false,
      categories: null,
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
      allIngredients: null,
      //   form validation
      valid: true,
      name: '',
      isRequired: [(v) => !!v || 'this field is required'],
      select: null,
      units: ['lg', 'l'],
      checkbox: false,
      ingredients: null,
      errors: [],
    }
  },
  components: {
    'create-ingredient': CreateIngredient,
  },
  mounted() {
    UserService.getIngredients().then(
      (data) => {
        this.ingredients = data
      },
      (error) => {
        this.currentUser =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
      },
    )
    UserService.getIngCategories().then(
      (data) => {
        this.categories = data
        this.loaded = true
      },
      (error) => {
        this.currentUser =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
      },
    )
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
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
    createIng() {
      console.log(this.new_ingredient)
    },
  },
}
</script>
