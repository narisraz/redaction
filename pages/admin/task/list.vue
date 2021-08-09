<template>
  <Tasks :contents="contents" :headers="headers">
    <template v-slot:newTask>
      <v-btn
        to="/admin/task/new"
        color="primary"
        class="mb-2"
      >
        Nouveau
      </v-btn>
    </template>

    <template v-slot:actions="{ item }">
      <v-btn 
        icon
        :to="{ path:'/admin/task/' + item.id }"
      >
        <v-icon
          small
          class="mr-2"
        >
          mdi-eye
        </v-icon>
      </v-btn>
      <v-btn 
        icon
        :to="{ path:'/admin/task/edit/' + item.id}"
      >
        <v-icon
          small
          class="mr-2"
        >
          mdi-pencil-outline
        </v-icon>
      </v-btn>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete-outline
      </v-icon>
      <v-dialog v-model="dialogDelete" max-width="500px" :retain-focus="false">
        <v-card>
          <v-card-title class="text-h5">Souhaitez vous vraiment supprimer cette tâche ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </Tasks>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data() {
    return {
      headers: [
        { text: 'Plateforme', value: 'platform' },
        { text: 'Compte', value: 'compte' },
        { text: 'Etoiles', value: 'stars' },
        { text: 'Mots', value: 'wordsNumber' },
        { text: 'Titre', value: 'title' },
        { text: 'Assigné à', value: 'assignedTo' },
        { text: 'Statut', value: 'status' },
        { text: 'Date limite', value: 'dateLimit' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      contents: [],
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        title: '',
        assignedTo: '',
        status: '',
      },
      defaultItem: {
        id: '',
        title: '',
        assignedTo: '',
        status: '',
      },
    }
  },
  watch: {
    '$store.state.users.list': function() {
      this.build()
    },
    '$store.state.comptes.list': function() {
      this.build()
    },
    '$store.state.platforms.list': function() {
      this.build()
    },
    '$store.state.tasks.list': function() {
      this.build()
    },
    '$store.state.status.list': function() {
      this.build()
    }
  },
  mounted() {
    this.build()
  },
  methods: {
    build() {
      const platforms = this.$store.state.platforms.list
      const comptes = this.$store.state.comptes.list
      const users = this.$store.state.users.list
      const tasks = this.$store.state.tasks.list
      const statusList = this.$store.state.status.list

      this.contents = tasks
        .map(t => {
          let assignedTo = ''
          let compte = ''
          let stars = ''
          let platform = ''
          let status = ''
          
          users
            .filter(u => u.id == t.agent)
            .map(u => assignedTo = u.name + ' ' + u.firstName)

          comptes
            .filter(c => c.id == t.compte)
            .map(c => {
              compte = c.name
              stars = c.stars
            })

          platforms
            .filter(p => p.id == t.platform)
            .map(p => platform = p.name)
          
          const dateLimit = t.deadline.date + ' à ' + t.deadline.hour

          statusList
            .filter(s => s.code == t.status)
            .map(s => status = s.label)

          return {
            ...t,
            assignedTo,
            compte,
            stars,
            platform,
            dateLimit,
            status
          }
        })
    },
    deleteItem (item) {
      this.editedIndex = this.contents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      this.$tasks.remove(this.editedItem)
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
