<template>
  <v-card>
    <v-toolbar>
      Utilisateur
      <v-spacer></v-spacer>
      <v-btn
        color="yellow"
        icon
        @click="editUser()"
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
        @click="deleteUser()"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>   
    </v-toolbar>
    <v-card-text>
      <v-avatar
        class="mb-2"
        color="grey"
        size="164"
        tile
      >
        <v-img 
          :src="profileUrl"
        ></v-img>
      </v-avatar>
      <div
        class="mb-2"
      >
        <div class="title">
          Login
        </div>
        {{ login }}
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
          Prénom
        </div>
        {{ firstName }}
      </div>
      <div
        class="mb-2"
      >
        <div class="title">
          Mot de passe
        </div>
        {{ password }}
      </div>
      <div
        class="mb-2"
      >
        <div class="title">
          Administrateur
        </div>
        {{ admin ? 'Oui' : 'Non' }}
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
      login: '',
      name: '',
      firstName: '',
      password: '',
      profileUrl : null,
      admin: ''
    }
  },
  watch: {
    '$store.state.users.list': function() {
      this.build()
    },
  },
  mounted() {
    this.build()
  },
  methods: {
    build() {
      const login =  this.$route.params.slug

      this.$store.state.users.list
        .filter(u => u.login == login)
        .map(u => {
          this.id = u.id
          this.login = u.login
          this.name = u.name
          this.firstName = u.firstName
          this.password = u.password
          this.admin = u.admin
          this.getProfile().then(e => this.profileUrl = e)
        })
    },
    async getProfile() {
      const refStorage = await this.$fire.storage.ref('profile/' + this.login + '.jpg')
      return refStorage.getDownloadURL()
    },
    editUser() {
      this.$router.push('/admin/user/edit/' + this.login);
    },
    async deleteUser() {
      this.$users.remove({
        id: this.id,
      })
      this.$router.push('/admin/user/list/');
    },
  }
}
</script>