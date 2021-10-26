<template>
  <div class="container pa-4">
    <ValidationObserver>
      <v-form
        ref="country"
        lazy-validation
        @submit.prevent="$emit('on-submit', selectedCountry)"
      >
        <ValidationProvider name="name" rules="required">
          <v-select
            v-model="selectedCountry"
            dense
            :items="countries"
            item-text="name"
            return-object
            slot-scope="{ errors, valid }"
            :success="valid"
            :error-messages="errors"
            placeholder="ex: uganda"
            label="select country"
          ></v-select>
        </ValidationProvider>
        <v-btn color="primary" type="submit">
          save
        </v-btn>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import countries from "../../tools/countries.json";

export default {
  name: "countryForm",
  props: ["editableCountry"],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      country: {
        name: "",
        country_code: "",
        active: false,
      },
      selectedCountry: null,
      countries: countries,
    };
  },
};
</script>
