<template>
  <div class="contents">
    <!-- sales panel -->
    <div class="sales-row">
      <v-row dense>
        <v-col md="12">
          <p class="row-title">Sales activities - week</p>
        </v-col>
        <!-- pending -->
        <v-col md="4">
          <simple-card
            title="pending"
            value="5600"
            pathTo="orders"
            total="23120"
            iconName = "mdi-check"
          />
        </v-col>
        <!-- to be delivered -->
        <v-col md="4">
          <simple-card
            title="to delivered"
            value="53230"
            pathTo="orders"
            total="23120"
            iconName = "mdi-car"
          />
        </v-col>
        <!-- pending orders  -->
        <v-col md="4">
          <simple-card
            title="completed"
            value="5600"
            pathTo="orders"
            total="23120"
            iconName = "mdi-check"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import simpleCard from '@/components/cards/simple-card.vue'
export default {
  name: 'Home-dashboard',
  components: {
    simpleCard,
  },
}
</script>
