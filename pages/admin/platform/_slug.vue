<template>
  <v-card>
    <v-toolbar>
      Plateforme
      <v-spacer></v-spacer>
      <v-btn
        color="yellow"
        icon
        @click="editPlatform()"
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
        @click="deletePlatform()"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>   
    </v-toolbar>
    <v-card-text>
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
          URL
        </div>
        {{ url }}
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
      url: '',
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
      const platforms = this.$store.state.platforms.list
      const name = this.$route.params.slug

      platforms
        .filter(p => p.name == name)
        .map(p => {
          this.id = p.id
          this.name = p.name
          this.url = p.url
        })
    },
    editPlatform() {
      this.$router.push('/admin/platform/edit/' + this.name);
    },
    async deletePlatform() {
      this.$platforms.remove({
        id: this.id,
      })
      this.$router.push('/admin/platform/list/');
    },
  }
}
</script>