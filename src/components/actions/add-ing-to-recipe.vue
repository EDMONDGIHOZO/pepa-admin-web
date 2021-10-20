<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          depressed
          rounded
          dark
          v-bind="attrs"
          v-on="on"
          small
        >
          add ingredient
        </v-btn>
      </template>
      <ValidationObserver ref="ing">
        <v-card slot-scope="{ validated, invalid }">
          <v-card-title class="text-h5 grey lighten-2">
            add ingredient
          </v-card-title>

          <v-card-text>
            <ValidationProvider name="name" rules="required|required">
              <v-select
                :items="ingredients"
                return-object
                item-text="name"
                v-model="ingredientObject"
              />
            </ValidationProvider>
            <ValidationProvider name="name" rules="required|min_value:1">
              <v-text-field label="quantity" type="number" v-model="quantity" />
            </ValidationProvider>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="adding"
              :disabled="invalid || !validated"
            >
              confirm
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'addIngToRecipe',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      dialog: false,
      name: '',
      ingredientObject: {},
      quantity: null,
      rules: {
        ing: (value) => value.length <= 1 || 'quantity must be at lease one',
      },
    }
  },
  computed: {
    ingredients() {
      return this.$store.state.ingredient.all
    },
    tempIngredients() {
      return this.$store.state.ingredient.tempIngredients
    },
  },
  methods: {
    adding() {
      let index = this.tempIngredients.findIndex(
        (ing) => ing.ingredient_id == this.ingredientObject.id,
      )

      if (index === -1) {
        const form = {
          name: this.ingredientObject.name,
          quantity: this.quantity,
          image_url: this.ingredientObject.image_url,
          ingredient_id: this.ingredientObject.id,
          unit_type: this.ingredientObject.unit_type,
        }
        this.$store.dispatch('ingredient/addTempIngredient', form)
        ;(this.ingredientObject = null), (this.quantity = null)
        this.dialog = false
      } else {
        alert('this item is already on the list')
      }
    },
  },
}
</script>
