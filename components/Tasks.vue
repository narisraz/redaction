<template>
  <div>
    <v-card>
      <v-card-title>
        Tâches
      </v-card-title>
    </v-card>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="contents"
        group-by="status"
        multi-sort
        class="elevation-1"
      >  
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Résultats : {{ contents.length }} tâche(s)</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <slot name="newTask"></slot>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <slot name="actions" v-bind:item="item"></slot>
        </template>      
      </v-data-table>
    
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      headers: {
        type: Array,
        default: [
          { text: 'Titre', value: 'title' },
          { text: 'Mots', value: 'wordsNumber' },
          { text: 'Assigné à', value: 'assignedTo' },
          { text: 'Statut', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      },
      contents: {
        type: Array,
        require: true
      }
    },
    computed: {
      formattedElapsedTime() {
        const date = new Date(null);
        date.setSeconds(this.elapsedTime / 1000);
        const utc = date.toUTCString();
        return utc.substr(utc.indexOf(":") - 2, 8);
      }
    },
  }
</script>
