<template>
  <v-container fill-height class="justify-center align-center">
    <v-card class="elevation-12" width="400">
      <v-toolbar dark color="primary">
        <v-toolbar-title>LOGIN</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div
          v-if="badCredentials"
          class="mb-4 error--text"
        >
          <v-icon
            color="error"
          >
            mdi-alert-box-outline
          </v-icon>
          Login ou mot de passe erroné
        </div>
        <v-form>
          <v-text-field
            v-model="user"
            label="Login"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="password"
            id="password"
            label="Password"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary"
          @click="login()"
        >Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  
</template>

<script>
export default {
  layout: 'base',
  data() {
    return {
      user: '',
      password: '',
      badCredentials: false
    }
  },
  methods: {
    login() {
      this.$auth.authenticate(this.user, this.password, this.success, this.failed)
    },
    success(user) {
      this.$comptes.listen(this.$store.commit, 'comptes/update')
      this.$platforms.listen(this.$store.commit, 'platforms/update')
      this.$users.listen(this.$store.commit, 'users/update')
      this.$tasks.listen(this.$store.commit, 'tasks/update')
      this.$status.listen(this.$store.commit, 'status/update')
      
      this.$store.commit('auth/authenticate', user)

      if (user.admin)
        this.$router.push('/admin/task/list/');
      else
        this.$router.push('/task/list/');
    },
    failed() {
      this.badCredentials = true
    }
  },
}
</script>
