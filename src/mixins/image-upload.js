import UserService from '../services/user-service'

export default {
  data: function () {
    return {
      currentFile: null,
      uploading: false,
      progress: 0,
      message: '',
      imageon: false,
      fileInfo: [],
      image_url: '',
    }
  },

  methods: {
    selectFile(image) {
      this.progress = 0
      this.imageon = true
      this.currentFile = image
    },

    upload() {
      console.log('start uploading')
      if (!this.currentFile) {
        this.message = 'please select an image to upload'
        return
      }

      this.message = ''

      this.uploading = true

      const action = UserService.imageUploader(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      })

      console.log('done uploading')
      return action
    },
  },
}
