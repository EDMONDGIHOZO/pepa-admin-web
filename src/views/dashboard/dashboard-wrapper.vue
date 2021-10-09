<template>
  <v-app id="pepa" dark>
    <v-navigation-drawer v-model="drawer" app>
      <v-card flat>
        <div class="logo-container">
          <v-img :src="logo" class="dashboard-menu-logo" />
        </div>
        <v-card-title>Admin Dashboard</v-card-title>
      </v-card>
      <v-list>
        <v-list-item link @click="navigate('dashboard-home')">
          <v-list-item-content>
            <v-list-item-title>dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
          <v-list-item
            v-for="child in menu.subs"
            :key="child.title"
            link
            dense
            @click="navigate(child.path)"
          >
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
          <v-btn block depressed color="primary" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app flat color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Pepa Dasboard {{ User }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="white" size="36">
              <span class="green--text">GD</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto px-3">
              <h3>gael didier</h3>
              <p class="text-caption mt-1">
                admin
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text>
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout">
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
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
import router from '../../router'
import Footer from '@/components/navigation/Footer.vue'
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      drawer: null,
      logo: require('../../assets/images/pepaword.png'),
      menuitems: [
        {
          title: 'Ingredients',
          icon: 'mdi-food-apple',
          subs: [
            { title: 'ingredients', icon: 'mdi-food', path: 'all-ingrdients' },
            {
              title: 'categories',
              icon: 'mdi-view-headline',
              path: 'ing-categories',
            },
          ],
        },
        {
          title: 'Recipes',
          icon: 'mdi-food',
          subs: [
            { title: 'Recipes', icon: 'mdi-food', path: 'recipes' },
            { title: 'categories', icon: 'mdi-eye' },
          ],
        },
        { title: 'orders', icon: 'mdi-wheel-barrow' },
      ],
    }
  },
  components: {
    Footer,
  },

  computed: {
    ...mapGetters({ User: 'StateUser' }),
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.navigate('login')
    },
    navigate: function (name) {
      router.push({ name: name }, () => {})
    },
  },
}
</script>
