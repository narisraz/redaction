<template>
  <Task :id=this.$route.params.slug>
    <template v-slot:price>
      <div 
        class="mb-4"
      >
        <div class="title">
          Montant
        </div>
        <div>{{ price }} €</div>
      </div>
    </template>

    <template v-slot:actions>
      <v-btn
        color="yellow"
        icon
        :to="{ path: '/admin/task/edit/' + id }"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        color="red"
        icon
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </template>

    <template v-slot:commande>
      <div
        class="mb-4"
      >
        <div class="title">
          Numéro de commande
        </div>
        <v-text-field
          v-model="commandId"
          outlined
        ></v-text-field>
      </div>
    </template>

    <template v-slot:platform>
      <div
        class="mb-4"
      >
        <div class="title">
          Compte
        </div>
        <div>{{ platform.name }}</div>
      </div>
    </template>

    <template v-slot:compte>
      <div
        class="mb-4"
      >
        <div class="title">
          Compte
        </div>
        <div>{{ compte.name }}</div>
      </div>
    </template>

    <template v-slot:deadline>
      <div class="mb-4">
        <div class="title">
          Date limite
        </div>
        <span>
          {{ deadline.date }} à {{ deadline.hour }}
        </span>
      </div>
    </template>
  </Task>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data() {
    return {
      id: '',
      commandId: '',
      price: '',
      compte: '',
      platform: '',
      deadline: {}
    }
  },
  watch: {
    '$store.state.task.list': function() {
      this.build()
    },
    '$store.state.comptes.list': function() {
      this.build()
    },
    '$store.state.platforms.list': function() {
      this.build()
    },
  },
  mounted() {
    this.build()
  },
  methods: {
    build() {
      const tasks = this.$store.state.tasks.list
      const platforms = this.$store.state.platforms.list
      const comptes = this.$store.state.comptes.list

      const task = tasks
        .filter(t => t.id == this.$route.params.slug)[0]

      this.platform = platforms
        .filter(p => p.id == task.platform)[0]

      this.compte = comptes
        .filter(c => c.id == task.compte)[0]

      this.id = task.id
      this.price = task.price
      this.commandId = task.commandId
      this.deadline = task.deadline
    }
  }
}
</script>