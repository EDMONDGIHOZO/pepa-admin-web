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
                      ingredients
                    </th>
                    <th class="text-left">
                      servings
                    </th>
                    <th class="text-left">
                      price / serving
                    </th>
                    <th class="text-left">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in recipes" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.ingredients.length }}</td>
                    <td>{{ item.servings }}</td>
                    <td>{{ item.price_per_serving }}</td>
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
          <div class="row-title">
            <p>new ingredient</p>
          </div>
          <div>
            <template>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="new_ingredient.name"
                  :rules="isRequired"
                  label="Name"
                  required
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="new_ingredient.unit_price"
                  :rules="isRequired"
                  label="Unit Price"
                  required
                  outlined
                  dense
                ></v-text-field>

                <v-select
                  :items="units"
                  filled
                  label="Unit Type"
                  v-model="new_ingredient.unit_type"
                  :rules="isRequired"
                ></v-select>

                <v-textarea
                  v-model="new_ingredient.description"
                  label="Description"
                  auto-grow
                  outlined
                  required
                ></v-textarea>
                <v-file-input
                  label="Image"
                  outlined
                  dense
                  @change="onFilePicked"
                ></v-file-input>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
      recipes: [
        {
          name: 'Frozen Yogurt',
          servings: 1,
          price_per_serving: 340,
          ingredients: [
            {
              id: '3efsdsfgadfg',
              name: 'tomatoes',
              price: 2303,
              quantity: 2,
              unit: 'kg',
            },
            {
              id: '3efsqwadfg',
              name: 't',
              price: 2303,
              quantity: 2,
              unit: 'kg',
            },
            {
              id: '3efsadf2g',
              name: 'tomatoes',
              price: 2303,
              quantity: 2,
              unit: 'kg',
            },
          ],
        },
      ],
    }
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
  },
}
</script>
