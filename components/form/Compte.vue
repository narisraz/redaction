<template>
  <v-card>
    <v-toolbar>
      Compte   
      <v-spacer></v-spacer>
      <v-btn
        color="green"
        icon
        @click="slug ? editCompte() : saveCompte()"
      >
        <v-icon>mdi-content-save-outline</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
        v-if="slug"
        @click="deleteCompte()"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>   
    </v-toolbar>
    <v-card-text>
      <v-select
        label="Plateforme"
        v-model="selectedPlatform"
        :items="platforms"
        item-text="name"
        item-value="id"
        persistent-hint
        return-object
        single-line
      ></v-select>
      <div>
        <div class="title">
          Nom
        </div>
        <v-text-field
          v-model="name"
          outlined
        ></v-text-field>
      </div>
      <div>
        <div class="title">
          Etoiles
        </div>
        <v-text-field
          v-model="stars"
          outlined
        ></v-text-field>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    slug: String
  },
  data() {
    return {
      selectedPlatform: {},
      platforms: [],
      platform: '',
      id: '',
      name: '',
      stars: ''
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
      this.platforms = this.$store.state.platforms.list

      const name = this.$route.params.slug
      if (!name)
        return;

      const comptes = this.$store.state.comptes.list
      comptes
        .filter(c => c.name == name)
        .map(c => {
          this.id = c.id
          this.name = c.name
          this.stars = c.stars
          this.platforms
            .filter(p => p.id = c.platform)
            .map(p => this.selectedPlatform = p)
        })
    },
    async editCompte() {
      this.$comptes.update({
        id: this.id,
        name: this.name,
        stars: this.stars,
        platform: this.selectedPlatform.id
      })
      this.$router.push('/admin/compte/list/');
    },
    async saveCompte() {
      this.$comptes.add({
        name: this.name,
        stars: this.stars,
        platform: this.selectedPlatform.id
      })
      this.$router.push('/admin/compte/list/');
    },
    deleteCompte() {
      this.$comptes.remove({
        id: this.id,
      })
      this.$router.push('/admin/compte/list/');
    }
  }
}
</script>