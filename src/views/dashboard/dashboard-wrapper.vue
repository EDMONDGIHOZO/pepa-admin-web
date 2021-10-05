<template>
  <v-app id="pepa" dark>
    <v-navigation-drawer v-model="drawer" app>
      <v-card flat>
        <v-card-content class="pa-3">
          <div class="logo-container">
            <v-img :src="logo" class="dashboard-menu-logo" />
          </div>
          <v-card-title>Admin Dashboard</v-card-title>
        </v-card-content>
      </v-card>
      <v-list>
        <v-list-group
          v-for="menu in menuitems"
          :key="menu.title"
          v-model="menu.active"
          :prepend-icon="menu.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="menu.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="child in menu.subs" :key="child.title" link dense>
            <v-list-item-icon>
              <v-icon small>{{ child.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ child.title }}</v-list-item-title>
            <v-divider></v-divider>
          </v-list-item>
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block depressed color="primary">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app flat color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Pepa Dasboard</v-toolbar-title>
    </v-app-bar>
    <v-container fluid>
      <!-- contents view -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/navigation/Footer.vue'
export default {
  data: function () {
    return {
      drawer: null,
      logo: require('../../assets/images/pepaword.png'),
      menuitems: [
        { title: 'Dasboard', icon: 'mdi-view-dashboard' },
        {
          title: 'Ingredients',
          icon: 'mdi-food-apple',
          subs: [
            { title: 'categories', icon: 'mdi-view-headline' },
            { title: 'all', icon: 'mdi-eye' },
            { title: 'create new', icon: 'mdi-plus' },
          ],
        },
        {
          title: 'Recipes',
          icon: 'mdi-food',
          subs: [
            { title: 'categories', icon: 'mdi-eye' },
            { title: 'all', icon: 'mdi-eye' },
            { title: 'create new', icon: 'mdi-plus' },
          ],
        },
        { title: 'orders', icon: 'mdi-wheel-barrow' },
      ],
    }
  },
  components: {
    Footer,
  },
}
</script>
