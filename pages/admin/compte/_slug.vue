<template>
  <v-card>
    <v-toolbar>
      Compte
      <v-spacer></v-spacer>
      <v-btn
        color="yellow"
        icon
        @click="editCompte()"
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
        @click="deleteCompte()"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>   
    </v-toolbar>
    <v-card-text>
      <div
        class="mb-2"
      >
        <div class="title">
          Plateforme
        </div>
        {{ platform }}
      </div>
      <div
        class="mb-2"
      >
        <div class="title">
          Nom
        </div>
        {{ name }}
      </div>
      <div
        class="mb-2"
      >
        <div class="title">
          Etoiles
        </div>
        {{ stars }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data() {
    return {
      id: '',
      name: '',
      stars: '',
      platform: '',
    }
  },
  watch: {
    '$store.state.comptes.list': function() {
      this.build()
    },
    '$store.state.platforms.list': function() {
      this.build()
    }
  },
  mounted() {
    this.build()
  },
  methods: {
    build() {
    const comptes = this.$store.state.comptes.list
    const platforms = this.$store.state.platforms.list
    const name = this.$route.params.slug
    comptes
      .filter(c => c.name == name)
      .map(c => {
        this.id = c.id
        this.name = c.name,
        this.stars = c.stars,
        platforms
          .filter(p => p.id = c.platform)
          .map(p => this.platform = p.name)
      })
    },
    editCompte() {
      this.$router.push('/admin/compte/edit/' + this.name);
    },
    deleteCompte() {
      this.$comptes.remove({
        id: this.id,
      })
      this.$router.push('/admin/compte/list/');
    },
  }
}
</script>