<template>
  <div class="container pa-4">
    <ValidationObserver>
      <v-form
        ref="country"
        lazy-validation
        @submit.prevent="$emit('on-submit', province)"
      >
        <ValidationProvider name="country" rules="required">
          <v-select
            v-model="province.country_id"
            dense
            :items="activeCountries"
            item-text="name"
            item-value="id"
            slot-scope="{ errors, valid }"
            :success="valid"
            :error-messages="errors"
            placeholder="ex: kigali"
            label="select country"
          ></v-select>
        </ValidationProvider>
        <ValidationProvider name="name" rules="required">
          <v-text-field v-model="province.name" outlined dense></v-text-field>
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
import locations from "../../tools/locations.json";
import { mapGetters, mapState } from "vuex";
export default {
  name: "provinceForm",
  props: ["editableProvince"],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapState("settings", ["countries"]),
    ...mapGetters("settings", ["activeCountries"]),
  },
  data() {
    return {
      province: {
        name: "",
        country_id: "",
        active: false,
      },
      selectedProvince: null,
      selectedCountry: null,
      provinces: locations.provinces,
    };
  },
};
</script>
