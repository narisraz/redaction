<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      fixed
      app
      dark
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="miniVariant = !miniVariant" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt keep-alive />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Tâches',
          to: '/admin/task/list'
        },
        {
          icon: 'mdi-list-status',
          title: 'Statuts',
          to: '/admin/status/list'
        },
        {
          icon: 'mdi-account-multiple-outline',
          title: 'Utilisateurs',
          to: '/admin/user/list'
        },
        {
          icon: 'mdi-web',
          title: 'Plateformes',
          to: '/admin/platform/list'
        },
        {
          icon: 'mdi-shield-account-outline',
          title: 'Comptes',
          to: '/admin/compte/list'
        }
      ],
      miniVariant: true,
      title: 'Rédaction'
    }
  }
}
</script>
