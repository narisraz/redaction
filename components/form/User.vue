<template>
  <v-card>
    <v-toolbar>
      Utilisateur   
      <v-spacer></v-spacer>
      <v-btn
        color="green"
        icon
        @click="slug ? editUser() : saveUser()"
      >
        <v-icon>mdi-content-save-outline</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
        v-if="slug"
        @click="deleteUser()"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>   
    </v-toolbar>
    <v-card-text>
      <div>
        <div class="title">
          Profile
        </div>
        <v-avatar
          class="profile"
          color="grey"
          size="164"
          tile
        >
          <v-img 
            :src="profileUrl"
          ></v-img>
        </v-avatar>
        <v-file-input
          v-model="profile"
          accept="image/*"
          label="File input"
        ></v-file-input>
      </div>
      <div>
        <div class="title">
          Login
        </div>
        <v-text-field
          v-model="login"
          outlined
        ></v-text-field>
      </div>
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
          Prénom
        </div>
        <v-text-field
          v-model="firstName"
          outlined
        ></v-text-field>
      </div>
      <div>
        <div class="title">
          Mot de passe
        </div>
        <v-text-field
          v-model="password"
          outlined
        ></v-text-field>
      </div>
      <div>
        <div class="title">
          Administrateur
        </div>
        <v-checkbox
          v-model="admin"
        ></v-checkbox>
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
      profile: null,
      profileUrl: null,
      id: '',
      login: '',
      name: '',
      firstName: '',
      password: '',
      admin: false
    }
  },
  watch: {
    '$store.state.users.list': function() {
      this.build()
    }
  },
  mounted() {
    this.build()
  },
  methods: {
    build() {
      const login =  this.$route.params.slug

      if (!login)
        return;

      const users = this.$store.state.users.list
      users
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
    async editUser() {
      this.$users.update({
        id: this.id,
        login: this.login,
        name: this.name,
        firstName: this.firstName,
        password: this.password,
        admin: this.admin,
      })
      
      const refStorage = await this.$fire.storage.ref('profile/' + this.login + '.jpg')
      refStorage.put(this.profile);
      
      this.$router.push('/admin/user/list/');
    },
    async saveUser() {
      this.$users.add({
        login: this.login,
        name: this.name,
        firstName: this.firstName,
        password: this.password,
        admin: this.admin,
      })
      
      const refStorage = await this.$fire.storage.ref('profile/' + this.login + '.jpg')
      refStorage.put(this.profile);
      
      this.$router.push('/admin/user/list/');
    },
    deleteUser() {
      this.$users.remove({
        id: this.id,
      })
      this.$router.push('/admin/user/list/');
    }
  }
}
</script>