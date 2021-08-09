<template>
  <div>
    <v-card>
      <v-card-title>
        Comptes
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
            <v-toolbar-title>Résultats : {{ contents.length }} compte(s)</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              to="/admin/compte/new"
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
            :to="{ path:'/admin/compte/' + item.name}"
          >
            <v-icon
              small
            >
              mdi-eye
            </v-icon>
          </v-btn>
          <v-btn 
            icon
            :to="{ path:'/admin/compte/edit/' + item.name}"
          >
            <v-icon
              small
            >
              mdi-pencil-outline
            </v-icon>
          </v-btn>
          <v-btn 
            icon
            @click="deleteItem(item)"
          >
            <v-icon
              small
            >
              mdi-delete-outline
            </v-icon>
          </v-btn>
          <v-dialog v-model="dialogDelete" max-width="500px" :retain-focus="false">
            <v-card>
              <v-card-title class="text-h5">Souhaitez vous vraiment supprimer ce compte ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
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
        { text: 'Plateforme', value: 'platform' },
        { text: 'Nom', value: 'name' },
        { text: 'Etoiles', value: 'stars' },
        { text: 'Actions', value: 'actions' },
      ],
      contents: [],
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        platform: '',
        name: '',
        stars: '',
      },
      defaultItem: {
        id: '',
        platform: '',
        name: '',
        stars: '',
      },
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
      this.contents = []

      const comptes = this.$store.state.comptes.list
      const platforms = this.$store.state.platforms.list
      
      platforms
        .map(p => comptes
          .map(c => c.platform == p.id
            ? {
              id: c.id,
              name: c.name,
              stars: c.stars,
              platform: p.name
            }
            : {})
          .filter(json => Object.keys(json).length > 0)
          .map(json => this.contents.push(json)))
    },
    editItem (item) {
      this.editedIndex = this.contents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$router.push('/admin/compte/edit/' + item.name);
    },
    deleteItem (item) {
      this.editedIndex = this.contents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      this.$comptes.remove(this.editedIndex)
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
