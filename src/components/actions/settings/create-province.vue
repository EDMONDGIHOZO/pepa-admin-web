<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          small
          depressed
          class="my-3"
        >
          add new
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="grey lighten-2">
          Create province
        </v-card-title>
        <province-form @on-submit="addProvince" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import settingsService from "../../../services/settings-service";
import provinceForm from "../../forms/province-form.vue";
export default {
  name: "createProvince",
  components: {
    "province-form": provinceForm,
  },
  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    addProvince(provinceForm) {
      const formdata = {
        name: provinceForm.name,
        country_id: provinceForm.country_id,
      };

      settingsService
        .createProvince(formdata)
        .then((res) => {
          if (res) {
            if (res.status === 200) {
              this.dialog = false;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
