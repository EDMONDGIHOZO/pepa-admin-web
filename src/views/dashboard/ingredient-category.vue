<template>
  <v-data-table
    :headers="headers"
    :items="ingredients"
    :search="search"
    sort-by="calories"
    class="outlined"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ category_name }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Ingredient Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="closeDelete">
                Cancel
              </v-btn>
              <v-btn color="primary darken-1" text @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.image_url="{ item }">
      <v-avatar size="30">
        <img :src="item.image_url" :alt="item.name" />
      </v-avatar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import ingredientCategoryService from '../../services/ingredient-category.service'
export default {
  props: ['category_id'],
  name: 'IngredientCategory',
  data: () => ({
    dialog: false,
    search: '',
    ingredients: [],
    category_name: '',
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: 'Unit Price', value: 'unit_price' },
      { text: 'Unit Type', value: 'unit_type' },
      { text: 'Description', value: 'description' },
      { text: 'Image', value: 'image_url' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
      image_url: '',
      unit_price: 0,
      unit_type: '',
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    category_id: function (newVal, oldVal) {
      // watch it
      if (newVal !== oldVal) {
        this.initialize()
      }
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      await ingredientCategoryService
        .show(this.category_id)
        .then((response) => {
          if (response.status === 200) {
            this.ingredients = response.data.data.ingredients
            this.category_name = response.data.data.name
          } else {
            alert('something went wrong')
          }
        })
    },

    editItem(item) {
      this.editedIndex = this.ingredients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      console.log(this.editedItem)
    },

    deleteItem(item) {
      this.editedIndex = this.ingredients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.ingredients.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.ingredients[this.editedIndex], this.editedItem)
      } else {
        this.ingredients.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
