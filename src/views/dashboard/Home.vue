<template>
  <div class="contents">
    <!-- sales panel -->
    <v-row fluid dense>
      <v-col cols="12">
        <p class="row-title">Sales Activities</p>
      </v-col>
      <!-- pending -->
      <v-col cols="12" md="4">
        <simple-card
          title="pending"
          value="5600"
          pathTo="orders"
          total="23120"
          iconName="mdi-check"
          :gradient="true"
        />
      </v-col>
      <!-- to be delivered -->
      <v-col cols="12" md="4">
        <simple-card
          title="to delivered"
          value="53230"
          pathTo="orders"
          total="23120"
          iconName="mdi-car"
          :gradient="true"
        />
      </v-col>
      <!-- pending orders  -->
      <v-col cols="12" md="4">
        <simple-card
          title="completed"
          value="5600"
          pathTo="orders"
          total="23120"
          iconName="mdi-check"
          :gradient="true"
        />
      </v-col>
    </v-row>
    <!-- enventory panel -->
    <div class="inventory-row">
      <v-row fluid>
        <v-col cols="12" md="8">
          <v-row>
            <!-- ingredients -->
            <v-col md="4" sm="12">
              <detail-card
                title="ingredients"
                value="34"
                pathTo="ingredients"
              />
            </v-col>
            <v-col md="4" sm="12">
              <detail-card title="recipes" value="20" pathTo="recipes" />
            </v-col>
            <v-col md="4" sm="12">
              <detail-card title="suppliers" value="30" pathTo="suppliers" />
            </v-col>
            <v-col cols="12">
              <v-card outlined class="pa-3">
                <p class="row-title">Latest orders</p>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Order id
                        </th>
                        <th class="text-left">
                          customer
                        </th>
                        <th class="text-left">
                          Fullfilment status
                        </th>
                        <th class="text-left">
                          payment status
                        </th>
                        <th class="text-left">
                          bill
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="order in orders" :key="order.id">
                        <td>{{ order.id }}</td>
                        <td>{{ order.customer_name }}</td>
                        <td>{{ order.fillment }}</td>
                        <td>{{ order.payment_status }}</td>
                        <td>{{ order.bill_amount }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <v-card outlined>
            <v-card-title>
              Featured Recipes
            </v-card-title>

            <v-list dense>
              <v-list-item link>
                <v-list-item-avatar>
                  <v-img
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Tomatoes</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-avatar>
                  <v-img
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Tomatoes</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-avatar>
                  <v-img
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Tomatoes</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-avatar>
                  <v-img
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Tomatoes</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import simpleCard from '@/components/cards/simple-card.vue'
import detailCard from '@/components/cards/detail-card.vue'

export default {
  name: 'Home-dashboard',
  components: {
    simpleCard,
    detailCard,
  },
  data() {
    return {
      orders: [
        {
          id: 'dsfgdsrfg',
          bill_amount: 159000,
          payment_status: 'paid',
          customer_name: 'Rutengeri',
          fillment: 'done',
        },
        {
          id: 'dsfgd3sfg',
          bill_amount: 159000,
          payment_status: 'paid',
          customer_name: 'Rutengeri',
          fillment: 'done',
        },
        {
          id: 'dsfgds32fg',
          bill_amount: 159000,
          payment_status: 'paid',
          customer_name: 'Rutengeri',
          fillment: 'done',
        },
      ],
    }
  },
}
</script>
