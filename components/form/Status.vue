<template>
  <v-card>
    <v-toolbar>
      Statut   
      <v-spacer></v-spacer>
      <v-btn
        color="green"
        icon
        @click="slug ? editStatus() : saveStatus()"
      >
        <v-icon>mdi-content-save-outline</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
        v-if="slug"
        @click="deleteStatus()"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>   
    </v-toolbar>
    <v-card-text>
      <div>
        <div class="title">
          Identifiant
        </div>
        <v-text-field
          v-model="code"
          outlined
        ></v-text-field>
      </div>
      <div>
        <div class="title">
          Libellé
        </div>
        <v-text-field
          v-model="label"
          outlined
        ></v-text-field>
      </div>
      <div>
        <div class="title">
          Niveau
        </div>
        <v-text-field
          v-model="level"
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
      code: '',
      label: '',
      level: ''
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
      const slug =  this.$route.params.slug
      
      if (!slug)
        return;

      this.$store.state.status.list
        .map(s => {
          this.id = s.id
          this.code = s.code
          this.label = s.label
          this.level = s.level
        })
    },
    async editStatus() {
      this.$status.update({
        id: this.id,
        code: this.code,
        label: this.label,
        level: this.level,
      })
      this.$router.push('/admin/status/list/');
    },
    async saveStatus() {
      this.$status.add({
        code: this.code,
        label: this.label,
        level: this.level,
      })
      this.$router.push('/admin/status/list/');
    },
    deleteStatus() {
      this.$status.remove({
        id: this.id,
      })
      this.$router.push('/admin/status/list/');
    }
  }
}
</script>