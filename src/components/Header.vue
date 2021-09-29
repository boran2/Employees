<template>
  <v-card class="#2A3B4D" >
    <v-app-bar absolute dark>
      <v-spacer></v-spacer>
      <template>
        <v-tabs align-with-title>
          <v-tab @click="setContentJobs()">Pracovné pozície</v-tab>
          <v-tab @click="setContentPersons()">Zamestnanci</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet>
      <v-container style="height: 64px"></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    // specifikuje poradie polozky v menu
    setContentJobs() {
        this.$root.menuOption = 1;
    },
    setContentPersons() {
        this.$root.menuOption = 2;
    }
  },
};
</script>