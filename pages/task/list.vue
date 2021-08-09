<template>
  <Tasks :contents="contents">
    <template v-slot:actions="{ item }">
      <v-btn 
        icon
        :to="{ path:'/task/' + item.id }"
      >
        <v-icon
          small
        >
          mdi-eye
        </v-icon>
      </v-btn>
    </template>
  </Tasks>
</template>

<script>

export default {
  data() {
    return {
      contents: [],
    }
  },
  watch: {
    '$store.state.users.list': function() {
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
      const users = this.$store.state.users.list
      const tasks = this.$store.state.tasks.list
      const statusList = this.$store.state.status.list

      this.contents = tasks
        .map(t => {
          let assignedTo = ''
          let status = ''
          
          users
            .filter(u => u.id == t.agent)
            .map(u => assignedTo = u.name + ' ' + u.firstName)
          
          const dateLimit = t.deadline.date + ' à ' + t.deadline.hour

          statusList
            .filter(s => s.code == t.status)
            .map(s => status = s.label)

          return {
            ...t,
            assignedTo,
            dateLimit,
            status
          }
        })
    }
  }
}
</script>

