<template>
  <div>
    <v-card outlined class="pa-4" color="grey lighten-5">
      <v-card-title>
        <p>create new</p>
      </v-card-title>
      <v-card-text>
        <ValidationObserver ref="ingobs">
          <v-form lazy-validation @submit.prevent="saveIngredient">
            <ValidationProvider name="name" rules="required">
              <v-text-field
                v-model="ingredient.name"
                dense
                outlined
                placeholder="ex: peanuts"
                label="name"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="description" rules="required">
              <v-text-field
                v-model="ingredient.description"
                dense
                outlined
                placeholder="ex: delicious"
                label="Description"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="unit_price" rules="required">
              <v-text-field
                v-model="ingredient.unit_price"
                dense
                outlined
                placeholder="ex: 4500"
                label="unit price"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="unit_type" rules="required">
              <v-select
                :items="units"
                item-text="name"
                item-value="id"
                v-model="ingredient.unit_type"
                label="unit type"
                outlined
                dense
              />
            </ValidationProvider>
            <ValidationProvider name="category" rules="required">
              <v-select
                :items="categories"
                item-text="name"
                item-value="id"
                v-model="ingredient.category_id"
                label="category"
                outlined
                dense
              />
            </ValidationProvider>
            <ValidationProvider name="image_url" rules="required">
              <v-file-input
                show-size
                outlined
                label="upload photo"
                dense
              ></v-file-input>
            </ValidationProvider>
          </v-form>
        </ValidationObserver>
      </v-card-text>
      <v-card-actions>
        <v-btn rounded color="primary" min-width="120" depressed>save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'CreateIngredient',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    categories() {
      return this.$store.state.app.ingredients_categories
    },
  },
  data: () => {
    return {
      loaded: false,
      ingredient: {
        name: '',
        description: '',
        image_url: '',
        category_id: null,
        unit_price: null,
        unit_type: null,
      },

      units: [
        {
          id: '434',
          name: 'KG(Kilograms)',
        },
        {
          id: '43443',
          name: 'L(Litres)',
        },
      ],
    }
  },
}
</script>
