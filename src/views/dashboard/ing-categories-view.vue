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
          <div class="row-title">
            <p>new category</p>
          </div>
          <div>
            <template>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="new_category.name"
                  :counter="10"
                  :rules="nameRules"
                  label="Name"
                  required
                  outlined
                  dense
                ></v-text-field>

                <v-textarea
                  v-model="new_category.description"
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
  name: 'IngCategoriesView',
  data() {
    return {
      search: '',
      new_category: {
        name: '',
        description: '',
        thumbnail: '',
        user_id: '',
      },
      imageName: '',
      imageFile: '',
      //   form validation
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      checkbox: false,
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
