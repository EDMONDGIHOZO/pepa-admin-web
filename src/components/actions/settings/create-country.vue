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
          {{ title }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="grey lighten-2">
          {{ title }} country
        </v-card-title>
        <country-form @on-submit="saveCountry" :editableCountry="country" />
        <v-progress-linear
          color="accent"
          indeterminate
          v-if="saving"
          height="10"
        />
      </v-card>
    </v-dialog>
    <v-alert color="primary" v-if="showMessage" dismissible dark>
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
import countryForm from "../../forms/country-form.vue";
import settingsService from "../../../services/settings-service";
export default {
  name: "createCountry",
  props: ["title", "country"],
  components: {
    "country-form": countryForm,
  },
  data() {
    return {
      dialog: false,
      saving: false,
      message: "",
      showMessage: false,
    };
  },

  methods: {
    saveCountry(countryForm) {
      this.saving = true;
      const formData = {
        name: countryForm.name,
        country_code: countryForm.code,
        active: false,
      };

      console.log(formData);

      settingsService.createCountry(formData).then((response) => {
        if (response) {
          if (response.status === 200) {
            this.$store.dispatch("settings/fetchCountries");
            this.message = "saved the country";
            this.saving = false;
            this.showMessage = true;
            this.dialog = false;
          }
        }
      });
    },
    updateCountry(countryForm) {
      this.saving = true;
      const formData = {
        name: countryForm.name,
        country_code: countryForm.code,
        active: false,
      };

      console.log(formData);

      settingsService.createCountry(formData).then((response) => {
        if (response) {
          if (response.status === 200) {
            this.$store.dispatch("settings/fetchCountries");
            this.message = "saved the country";
            this.saving = false;
            this.showMessage = true;
            this.dialog = false;
          }
        }
      });
    },
  },
};
</script>
