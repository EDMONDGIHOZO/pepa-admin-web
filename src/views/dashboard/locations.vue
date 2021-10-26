<template>
  <div class="container">
    <v-card flat>
      <v-card-title>
        <h2>Operational locations</h2>
      </v-card-title>
      <v-card-text>
        you can view or manage the locations that our app can serve. countries,
        provinces, and districts
      </v-card-text>
    </v-card>
    <!-- sections -->
    <v-card outlined class="pa-5">
      <v-row wrap>
        <v-col cols="12" md="4">
          <div class="title-row">
            <h2>Countries</h2>
            <v-spacer />
            <create-country title="add new" />
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Code</th>
                  <th class="text-left">Active</th>
                  <th class="text-left">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in countries" :key="c.id">
                  <td>{{ c.name }}</td>
                  <td>{{ c.country_code }}</td>
                  <td>
                    <v-chip
                      :color="c.active ? 'secondary' : 'red'"
                      v-text="c.active ? 'yes' : 'no'"
                      :loading="loading"
                      outlined
                    >
                    </v-chip>
                  </td>
                  <td>
                    <v-btn
                      small
                      depressed
                      :color="c.active ? 'accent' : 'primary'"
                      @click="updateStatus(c.active, c.id)"
                    >
                      {{ c.active ? "disable" : "activate" }}
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-divider vertical class="d-none d-md-flex d-lg-flex" />
        <!-- ------------------------------------- provinces--------------------------------------------------------------------------------------- -->
        <v-col cols="12" md="4">
          <div class="title-row">
            <h2>Provinces</h2>
            <v-spacer />
            <create-province />
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Active</th>
                  <th class="text-left">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in provinces" :key="p.id">
                  <td>{{ p.name }}</td>
                  <td>
                    <v-chip
                      :color="p.active ? 'secondary' : 'red'"
                      v-text="p.active ? 'yes' : 'no'"
                      outlined
                    >
                    </v-chip>
                  </td>
                  <td>
                    <v-btn color="accent" small depressed> edit </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <!-- ------------------------------------- districts --------------------------------------------------------------------------------------- -->
        <v-divider vertical class="d-none d-md-flex d-lg-flex" />
        <v-col cols="12" md="4">
          <div class="title-row">
            <h2>Districts</h2>
            <v-spacer />
            <create-district />
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Active</th>
                  <th class="text-left">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="d in districts" :key="d.id">
                  <td>{{ d.name }}</td>
                  <td>
                    <v-chip
                      :color="d.active ? 'secondary' : 'red'"
                      v-text="d.active ? 'yes' : 'no'"
                      outlined
                    >
                    </v-chip>
                  </td>
                  <td>
                    <v-btn color="accent" small depressed> edit </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-divider vertical class="d-none d-md-flex d-lg-flex" />
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import createCountry from "../../components/actions/settings/create-country.vue";
import createProvince from "../../components/actions/settings/create-province.vue";
import createDistrict from "../../components/actions/settings/create-district.vue";
import settingsService from "../../services/settings-service";
export default {
  name: "locations",
  components: {
    "create-country": createCountry,
    "create-district": createDistrict,
    "create-province": createProvince,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("settings", ["countries", "provinces", "districts"]),
  },
  created() {
    this.fetchContents();
  },
  methods: {
    fetchContents() {
      this.$store.dispatch("settings/fetchCountries");
      this.$store.dispatch("settings/fetchProvinces");
    },
    updateStatus(currentStatus, id) {
      const formdata = {
        active: !currentStatus,
      };
      this.loading = true;
      settingsService.updateStatus(formdata, id).then((response) => {
        if (response) {
          if (response.status === 200) {
            this.loading = false;
            this.$store.dispatch("settings/fetchCountries");
          }
        }
      });
    },
  },
};
</script>
