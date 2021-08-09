<template>
  <v-card>
    <v-toolbar>
      Statut
      <v-spacer></v-spacer>
      <v-btn
        color="yellow"
        icon
        @click="editStatus()"
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
        @click="deleteStatus()"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>   
    </v-toolbar>
    <v-card-text>
      <div
        class="mb-2"
      >
        <div class="title">
          Identifiant
        </div>
        {{ code }}
      </div>
      <div
        class="mb-2"
      >
        <div class="title">
          Nom
        </div>
        {{ label }}
      </div>
      <div
        class="mb-2"
      >
        <div class="title">
          Niveau
        </div>
        {{ level }}
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
      code: '',
      label: '',
      level: '',
    }
  },
  watch: {
    '$store.state.status.list': function() {
      this.build()
    }
  },
  mounted() {
    this.build()
  },
  methods: {
    build() {
      const status = this.$store.state.status.list
      const id = this.$route.params.slug

      status
        .filter(s => s.id == id)
        .map(s => {
          this.id = s.id
          this.code = s.code
          this.label = s.label
          this.level = s.level
        })
    },
    editStatus() {
      this.$router.push('/admin/status/edit/' + this.label);
    },
    async deleteStatus() {
      this.$status.remove({
        id: this.id,
      })
      this.$router.push('/admin/status/list/');
    },
  }
}
</script>