<template>
  <div>
    <v-card>
      <v-card-title>
        Statuts
      </v-card-title>
    </v-card>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="contents"
        :sort-by="['level']"
        class="elevation-1"
      >  
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Résultats : {{ contents.length }} statut(s)</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              to="/admin/status/new"
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
            :to="{ path:'/admin/status/' + item.id }"
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
        </template>      
      </v-data-table>
      <v-dialog v-model="dialogDelete" max-width="500px" :retain-focus="false">
        <v-card>
          <v-card-title class="text-h5">Souhaitez vous vraiment supprimer ce statut ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        { text: 'Identifiant', value: 'code' },
        { text: 'Niveau', value: 'level' },
        { text: 'Libellé', value: 'label' },
        { text: 'Actions', value: 'actions' },
      ],
      contents: [],
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        code: '',
        level: '',
        label: ''
      },
      defaultItem: {
        id: '',
        code: '',
        level: '',
        label: ''
      },
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
      this.contents = this.$store.state.status.list
    },
    editItem (item) {
      this.editedIndex = this.contents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$router.push('/admin/status/edit/' + item.name);
    },
    deleteItem (item) {
      this.editedIndex = this.contents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      this.$status.remove(this.editedItem)
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
