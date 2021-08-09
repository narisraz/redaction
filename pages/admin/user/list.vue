<template>
  <div>
    <v-card>
      <v-card-title>
        Utilisateurs
      </v-card-title>
    </v-card>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="contents"
        multi-sort
        class="elevation-1"
      >  
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Résultats : {{ contents.length }} utilisateur(s)</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              to="/admin/user/new"
              color="primary"
              class="mb-2"
            >
              Nouveau
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn 
            icon
            :to="{ path:'/admin/user/' + item.login}"
          >
            <v-icon
              small
              class="mr-2"
            >
              mdi-eye
            </v-icon>
          </v-btn>
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil-outline
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-delete-outline
          </v-icon>
          <v-dialog v-model="dialogDelete" max-width="500px" :retain-focus="false">
            <v-card>
              <v-card-title class="text-h5">Souhaitez vous vraiment supprimer cet utilisateur ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>      
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      headers: [
        { text: 'Login', value: 'login' },
        { text: 'Nom', value: 'name' },
        { text: 'Prénoms', value: 'firstName' },
        { text: 'Mot de passe', value: 'password' },
        { text: 'Administrateur', value: 'administrator' },
        { text: 'Actions', value: 'actions' },
      ],
      contents: [],
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        login: '',
        name: '',
        firstName: '',
        password: '',
        administrator: ''
      },
      defaultItem: {
        id: '',
        login: '',
        name: '',
        firstName: '',
        password: '',
        administrator: ''
      },
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
      this.contents = this.$store.state.users.list
        .map(u => {
          u['administrator'] = u.admin ? 'Oui' : 'Non'
          return u
        })
    },
    editItem (item) {
      this.editedIndex = this.contents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$router.push('/admin/user/edit/' + item.login);
    },
    deleteItem (item) {
      this.editedIndex = this.contents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      this.$users.remove(this.editedItem)
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>
