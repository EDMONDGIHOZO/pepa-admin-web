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
          <div v-if="loaded">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th
                      v-for="menu in table_headers"
                      :key="menu.id"
                      class="text-left"
                    >
                      {{ menu.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in ingredients" :key="item.name">
                    <td>
                      <v-avatar size="30">
                        <v-img :src="item.image_url" alt="thumb" />
                      </v-avatar>
                    </td>
                    <td>{{ item.name }}</td>
                    <td v-if="item.category">{{ item.category.name }}</td>
                    <td v-else>
                      <p class="red--text">category name is not found</p>
                    </td>
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.unit_type }}</td>
                    <td
                      class="d-flex flex-center justify-between flex-row align-center"
                    >
                      <edit-ingredient :ingredientDetails="item" />
                      <v-btn
                        color="red"
                        depressed
                        small
                        class="mr-2 white--text"
                        rounded
                        @click="showDeleteDialog(item.id)"
                        icon
                      >
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div v-else>
            <v-skeleton-loader class="max-auto" type="table" />
          </div>
        </v-card>
      </v-col>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="dialogDelete = false">
              Cancel
            </v-btn>
            <v-btn color="primary darken-1" text @click="deleteIngredient">
              OK
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="12" md="4">
        <create-ingredient />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CreateIngredient from '@/components/actions/create-ingredient.vue'
import editIngredient from '@/components/dialogs/edit-ingredient.vue'

export default {
  name: 'Ingredients',
  data() {
    return {
      search: '',
      dialogDelete: false,
      selectedItem: 0,
      table_headers: [
        {
          id: '1',
          title: 'Photo',
        },
        {
          id: '2',
          title: 'Name',
        },
        {
          id: '3',
          title: 'Category',
        },
        {
          id: '4',
          title: 'Unit price',
        },
        {
          id: '5',
          title: 'Unit Type',
        },
        {
          id: '6',
          title: 'Actions',
        },
      ],
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
      errors: [],
    }
  },
  components: {
    'create-ingredient': CreateIngredient,
    'edit-ingredient': editIngredient,
  },

  computed: {
    ingredients() {
      return this.$store.state.ingredient.all
    },
    loaded() {
      return this.$store.state.ingredient.loaded
    },
  },

  created() {
    this.$store.dispatch('ingredientCategory/getAll')
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    createIng() {
      console.log(this.new_ingredient)
    },
    showDeleteDialog(id) {
      this.selectedItem = id
      this.dialogDelete = true
    },
    handleIngredientEdit() {
      console.log('editing the shit')
    },

    async deleteIngredient() {
      await this.$store.dispatch('app/deleteIngredient', this.selectedItem)
      this.$store.dispatch('app/getingredients')
      this.dialogDelete = false
      location.reload()
    },
  },
}
</script>
