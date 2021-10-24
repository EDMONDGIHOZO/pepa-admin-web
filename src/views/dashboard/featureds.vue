<template>
  <div class="container">
    <div class="title-row">
      <h2>featured Items</h2>
    </div>
    <v-row wrap>
      <v-col cols="12" v-if="loading">
        <v-skeleton-loader type="table" />
      </v-col>
      <v-col cols="12" v-else>
        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    type
                  </th>
                  <th class="text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in all" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td>
                    <v-btn
                      icon
                      color="red"
                      small
                      @click="removeFeatured(item.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-col>
    </v-row>
    <v-alert :type="messageType" v-if="showMessage" dismissible>
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Featureds',
  computed: {
    ...mapState('Featureds', [
      'all',
      'loading',
      'deleting',
      'message',
      'showMessage',
      'messageType',
    ]),
  },
  created() {
    this.$store.dispatch('Featureds/getFeatured')
  },
  methods: {
    removeFeatured(id) {
      this.$store.dispatch('Featureds/removeFeatured', id)
    },
  },
}
</script>
