<template>
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
        <p class="white--text">create new</p>
      </v-card-title>
      <v-card-text>
        <ValidationObserver>
          <div class="form-container">
            <v-form
              lazy-validation
              @submit.prevent="handleCreateIngredient"
              ref="ingredientform"
            >
              <ValidationProvider name="name" rules="required">
                <v-text-field
                  v-model="ingredient.name"
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
              <ValidationProvider name="description" rules="required">
                <v-text-field
                  v-model="ingredient.description"
                  dense
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :error-messages="errors"
                  solo
                  background-color="white"
                  placeholder="ex: delicious"
                  label="Description"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="unit_price" rules="required">
                <v-text-field
                  v-model="ingredient.unit_price"
                  dense
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :error-messages="errors"
                  type="number"
                  solo
                  background-color="white"
                  placeholder="ex: 4500"
                  label="unit price"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="unit type" rules="required">
                <v-select
                  :items="units"
                  item-text="name"
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :error-messages="errors"
                  item-value="id"
                  v-model="ingredient.unit_type"
                  label="unit type"
                  solo
                  background-color="white"
                  dense
                />
              </ValidationProvider>
              <ValidationProvider name="category" rules="required">
                <v-select
                  slot-scope="{ errors, valid }"
                  :success="valid"
                  :items="categories"
                  :error-messages="errors"
                  item-text="name"
                  item-value="id"
                  v-model="ingredient.category_id"
                  label="category"
                  solo
                  background-color="white"
                  dense
                />
              </ValidationProvider>
              <v-file-input
                show-size
                solo
                background-color="white"
                label="upload photo"
                @change="selectFile"
                dense
              ></v-file-input>
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
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import upload from '../../mixins/image-upload'
import selectFile from '../../mixins/image-upload'
import ingredientService from '../../services/ingredient.service'
export default {
  name: 'CreateIngredient',
  mixins: [upload, selectFile],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    categories() {
      return this.$store.state.ingredientCategory.all
    },
  },
  data: () => {
    return {
      loaded: false,
      saving: false,
      errors: [],
      showErrors: false,
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
          name: 'KG',
        },
        {
          id: '43443',
          name: 'L',
        },
      ],
    }
  },
  methods: {
    async handleCreateIngredient() {
      this.showErrors = false
      const valid_form = await this.$refs.ingredientform.validate()
      if (valid_form) {
        // upload image first
        this.saving = true
        const imagedata = await this.upload()

        if (imagedata) {
          this.ingredient.image_url = imagedata.data.url
        }

        const formData = {
          name: this.ingredient.name,
          description: this.ingredient.description,
          unit_price: this.ingredient.unit_price,
          unit_type: this.ingredient.unit_type,
          category_id: this.ingredient.category_id,
          image_url: this.ingredient.image_url,
        }
        ingredientService
          .create(formData)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            this.errors = error.response.data.messages.errors
            this.showErrors = true
          })
        this.$store.dispatch('app/getingredients')
        this.saving = false
        this.reset()
      }
    },

    reset() {
      this.$refs.ingredientform.reset()
    },
  },
}
</script>
