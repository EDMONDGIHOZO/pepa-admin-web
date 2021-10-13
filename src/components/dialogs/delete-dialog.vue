<template>
  <div justify="space-around">
    <v-dialog
      transition="dialog-top-transition"
      max-width="400"
      v-model="showdialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" v-bind="attrs" v-on="on" icon small>
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:default="showdialog">
        <v-card>
          <v-toolbar color="red" elevation="0" class="white--text">
            delete {{ name }}
          </v-toolbar>
          <v-progress-linear color="accent" indeterminate height="10"></v-progress-linear>
          <v-card-text>
            <div class="h2-text">Are your sure?</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="showdialog.value = false">no</v-btn>
            <v-btn text @click="deleteCategory">yes</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import UserService from '../../services/user-service'
export default {
  name: 'deleteDialog',
  props: ['name', 'id'],
  data() {
    return {
      loading: false,
      showdialog: false,
    }
  },
  methods: {
    deleteCategory() {
      this.loading = true
      UserService.deleteIngCategories(this.id)
        .then((response) => {
          if (response.status === 200) {
              console.log(response)
            this.$store.dispatch('app/getIngeredientCategories'),
              (this.showdialog = false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
