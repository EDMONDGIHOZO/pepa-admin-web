<template>
  <div class="container">
    <v-card flat>
      <v-card-title> Orders </v-card-title>
      <v-card-text>
        you can review and manage orders with their details.
      </v-card-text>
      <v-tabs v-model="tab" left>
        <v-tab v-for="item in filtertabs" :key="item.tab">
          {{ item.title }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in filtertabs" :key="item.tab">
          <v-card flat>
            <v-data-table
              :headers="headers"
              :items="orders"
              sort-by="status"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <h2>{{ item.tabContentName }} Orders</h2>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.status"
                                label="Dessert name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.payment_method"
                                label="Calories"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.delivery_date"
                                label="Fat (g)"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Orders",
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  data() {
    return {
      tab: null,
      filtertabs: [
        {
          id: 1,
          title: "All orders",
          tabContentName: "all",
        },
        {
          id: 2,
          title: "Completed",
          tabContentName: "completed",
        },
        {
          id: 3,
          title: "Pending",
          tabContentName: "pending",
        },
        {
          id: 4,
          title: "Canceled",
          tabContentName: "canceled",
        },
      ],
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: "Order ID",
          align: "start",
          sortable: false,
          value: "order_id",
        },
        { text: "Customer name", value: "customer.name" },
        { text: "Delivery delivery address", value: "delivery_address" },
        { text: "Delivery date", value: "delivery_date" },
        { text: "Delivery Pricing", value: "delivery_price" },
        { text: "Delivery status", value: "status" },
        { text: "Payment Method", value: "payment", sortable: false },
      ],
      orders: [],
      editedIndex: -1,
      editedItem: {
        status: null,
        delivery_date: null,
        payment_method: null,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    };
  },
  methods: {
    initialize() {
      this.orders = [
        {
          customer: {
            id: "423",
            name: "kalisa john",
            phones: "07834434534",
          },
          order_id: "2334df",
          delivery_date: "12 / march 2021",
          delivery_price: 34000,
          delivery_address: "Kigali",
          status: "pending",
          payment: "Mobile Money",
        },
        {
          customer: {
            id: "23df3",
            name: "g john",
            phones: "07834434534",
          },
          order_id: "2334df",
          delivery_date: "12 / march 2021",
          delivery_price: 34000,
          delivery_address: "Kigali",
          status: "pending",
          payment: "Mobile Money",
        },
        {
          customer: {
            id: "2533",
            name: "sa john",
            phones: "07834434534",
          },
          order_id: "2334df",
          delivery_date: "12 / march 2021",
          delivery_price: 34000,
          delivery_address: "Kigali",
          status: "pending",
          payment: "Mobile Money",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>