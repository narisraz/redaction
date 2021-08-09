<template>
  <v-snackbar
    v-model="show"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      text: String
    },
  }
</script>