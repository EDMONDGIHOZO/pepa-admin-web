<template>
  <v-form ref="form" lazy-validation @submit.prevent="$emit('on-submit', form)">
    <v-row wrap>
      <v-col cols="12">
        <v-sheet class="my-3 d-flex align-center flex-center">
          <v-img
            height="250"
            width="250"
            class="rounded alevation-2"
            :src="form.image_url"
          ></v-img>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.name"
          :rules="isRequireRule"
          label="Name"
          required
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.unit_price"
          :rules="isRequireRule"
          label="Price (RWF)"
          required
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-textarea
          v-model="form.description"
          label="Description"
          :rules="isRequireRule"
          auto-grow
          outlined
          required
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="categories"
          item-value="id"
          item-text="name"
          v-model="form.category_id"
          label="select category"
          outlined
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="unit_types"
          item-value="name"
          item-text="name"
          v-model="form.unit_type"
          label="Unit type"
          outlined
          dense
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input
          show-size
          label="Photo"
          outlined
          dense
          @change="selectFile"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-progress-linear
      v-model="progress"
      color="light-blue"
      reactive
      v-if="uploading"
    >
      <p class="small">{{ message }} %</p>
    </v-progress-linear>
    <p class="text-center italic-center">{{ message }}</p>
    <v-btn
      :disabled="imageon"
      color="success"
      class="mr-4"
      depressed
      type="submit"
      rounded
    >
      Update
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset" rounded depressed>
      clear
    </v-btn>
  </v-form>
</template>

<script>
import UserService from '../../services/general.service'

export default {
  name: 'IngredientForm',
  props: {
    ingredient: {
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      currentFile: null,
      uploading: false,
      progress: 0,
      message: '',
      imageon: false,
      fileInfo: [],
      isRequireRule: [(v) => !!v || 'this field is required'],

      form: {
        name: this.ingredient?.name || '',
        description: this.ingredient?.description || '',
        image_url: this.ingredient?.image_url || '',
        id: this.ingredient?.id || null,
        unit_price: this.ingredient?.unit_price || null,
        unit_type: this.ingredient?.unit_type || null,
        category_id: this.ingredient?.category_id || null,
      },
    }
  },
  computed: {
    categories() {
      return this.$store.state.ingredientCategory.all
    },
    unit_types() {
      return this.$store.state.ingredient.unit_types
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },

    selectFile(image) {
      this.progress = 0
      this.imageon = true
      this.currentFile = image
      setTimeout(this.upload(), 2000)
    },

    upload() {
      if (!this.currentFile) {
        this.message = 'please select an image to upload'
        return
      }

      this.message = ''

      this.uploading = true

      UserService.imageUploader(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      }).then((response) => {
        if (response.status === 200) {
          this.imageon = false
          this.form.image_url = response.data.url
          this.uploading = false
        }
      })
    },
  },
}
</script>
