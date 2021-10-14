<template>
  <v-form ref="form" lazy-validation @submit.prevent="$emit('on-submit', form)">
    <v-text-field
      v-model="form.name"
      :rules="isRequireRule"
      label="Name"
      required
      outlined
      dense
    ></v-text-field>

    <v-textarea
      v-model="form.description"
      label="Description"
      :rules="isRequireRule"
      auto-grow
      outlined
      required
    ></v-textarea>
    <v-file-input
      show-size
      label="Photo"
      outlined
      dense
      @change="selectFile"
    ></v-file-input>
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
      Save
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset" rounded depressed>
      clear
    </v-btn>
  </v-form>
</template>

<script>
import UserService from '../../services/user-service'

export default {
  name: 'IngredientCategoryForm',
  props: {
    category: {
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
        name: this.category?.name || '',
        description: this.category?.description || '',
        image_url: this.category?.image_url || '',
      },
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    handleSaving() {
      console.log('thefuck')
    },

    selectFile(image) {
      this.progress = 0
      this.imageon = true
      this.currentFile = image
      setTimeout(this.upload, 2000)
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
