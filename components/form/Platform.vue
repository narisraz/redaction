<template>
  <v-card>
    <v-toolbar>
      Plateforme   
      <v-spacer></v-spacer>
      <v-btn
        color="green"
        icon
        @click="slug ? editPlatform() : savePlatform()"
      >
        <v-icon>mdi-content-save-outline</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
        v-if="slug"
        @click="deletePlatform()"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>   
    </v-toolbar>
    <v-card-text>
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
          URL
        </div>
        <v-text-field
          v-model="url"
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
      id: '',
      name: '',
      url: ''
    }
  },
  watch: {
    '$store.state.platforms.list': function() {
      this.build()
    }
  },
  mounted() {
    this.build()
  },
  methods: {
    build() {
      const name =  this.$route.params.slug
      
      if (!name)
        return;

      this.$store.state.platforms.list
        .map(p => {
          this.id = p.id
          this.name = p.name
          this.url = p.url
        })
    },
    async editPlatform() {
      this.$platforms.update({
        id: this.id,
        name: this.name,
        url: this.url,
      })
      this.$router.push('/admin/platform/list/');
    },
    async savePlatform() {
      this.$platforms.add({
        name: this.name,
        url: this.url,
      })
      this.$router.push('/admin/platform/list/');
    },
    deletePlatform() {
      this.$platforms.remove({
        id: this.id,
      })
      this.$router.push('/admin/platform/list/');
    }
  }
}
</script>