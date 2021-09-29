<template>
  <v-container fluid style="height: 90vh" class="pt-16 pb-16">
    <v-row class="mt-5">
      <v-col class="text-center" cols="12">
        <h1 class="headline">Zoznam pracovných pozícií</h1>
      </v-col>
    </v-row>
    <v-row class="justify-center text-center mt-5">
      <v-col cols="6">
        <v-data-table
          :headers="headers"
          :items="jobs"
          class="elevation-1"
          :items-per-page="10"
          :item-class="itemRowBackground"
        >
          <template v-slot:top>
            <v-divider class="grey darken-1"></v-divider>
            <v-toolbar flat height="0px">
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="white"
                    fab
                    class="mt-10"
                    x-small
                    bottom
                    left
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="grey darken-1">mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="justify-center grey darken-1">
                    <span
                      v-if="editedItem.name !== ''"
                      class="text-h6 white--text"
                      >Vytvoriť alebo upraviť pracovnú pozíciu
                      {{ editedItem.name }}</span
                    >
                    <span v-else class="text-h6 white--text"
                      >Vytvoriť pracovnú pozíciu</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="* NÁZOV PRACOVNEJ POZÍCIE"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.salary"
                            label="* ŠTANDARDNÝ PLAT V €"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Zrušiť
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Uložiť
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="700px">
                <v-card>
                  <v-card-title
                    class="justify-center text-h6 grey darken-1 white--text"
                    >Naozaj chcete vymazať pracovnú pozíciu
                    {{ editedItem.name }}?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Zrušiť</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >Vymazať</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogShow" max-width="500px">
                <v-card>
                  <v-card-title
                    class="
                      justify-center
                      text-h6
                      mb-3
                      grey
                      darken-1
                      white--text
                    "
                  >
                    {{ editedItem.name }}
                  </v-card-title>
                  <v-row class="pl-16" v-if="editedItem.salary">
                    <v-col cols="12" sm="4" md="6">
                      <span class="body-1">Štandardný plat: </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1"
                        ><strong>{{ editedItem.salary }}€</strong></span
                      ></v-col
                    >
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeShow"
                      >Zavrieť</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogAlert" max-width="400px">
                <v-alert v-if="alertSuccess" type="success" class="mb-0">
                  <v-row align="center">
                    <v-col cols="12" sm="6" md="10">
                      {{ textAlert }}
                    </v-col>
                    <v-col cols="12" sm="1" md="2">
                      <v-btn @click="closeAlertDialog" icon color="white">
                        <v-icon small dark>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-alert>
                <v-alert v-else type="error" class="mb-0">
                  <v-row align="center">
                    <v-col cols="12" sm="6" md="10">
                      {{ textAlert }}
                    </v-col>
                    <v-col cols="12" sm="1" md="2">
                      <v-btn @click="closeAlertDialog" icon color="white">
                        <v-icon small dark>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="showItem(item)">mdi-magnify</v-icon>
            <v-icon @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogShow: false,
    dialogAlert: false,
    alertSuccess: true,
    textAlert: "",
    headers: [],
    jobs: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      salary: null,
    },
    defaultItem: {
      name: "",
      salary: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Pridať pracovnú pozíciu"
        : "Upraviť pracovnú pozíciu";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogShow(val) {
      val || this.closeShow();
    },
    dialogAlert(val) {
      val || this.closeAlertDialog();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    // nacitanie dat z main.js ("databaza")
    initialize() {
      this.headers = this.$root.jobs.headers;
      for (var i = 0; i < this.$root.jobs.data.length; i++) {
        var job = {
          name: "",
          salary: null,
        };
        job.name = this.$root.jobs.data[i].name;
        job.salary = this.$root.jobs.data[i].salary;
        this.jobs.push(job);
      }
    },

    // zobrazenie nahladu pozicie
    showItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogShow = true;
    },

    // zobrazenie upravovacieho okna
    editItem(item) {
      this.editedIndex = this.jobs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // zobrazenie delete okna
    deleteItem(item) {
      this.editedIndex = this.jobs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    // styl tabulky
    itemRowBackground: function (item) {
      return item.protein > 4.2 ? "style-1" : "style-2";
    },

  // vymazanie pozicie z tabulky a z dat v main.js
    deleteItemConfirm() {
      if (this.editedIndex > this.jobs.length) {
        this.textAlert =
          "Pracovnú pozíciu nie je možné vymazať, zlé id pracovnej pozície!";
        this.alertSuccess = false;
        this.dialogAlert = true;
        return;
      }

      for (var i = 0; i < this.$root.persons.data.length; i++) {
        if (
          this.$root.persons.data[i].id_job ===
          this.$root.jobs.data[this.editedIndex].id
        ) {
          this.textAlert =
            "Pracovnú pozíciu nie je možné vymazať, pretože existuje zamestnaná osoba na tejto pozícií!";
          this.alertSuccess = false;
          this.dialogAlert = true;
          return;
        }
      }
      this.jobs.splice(this.editedIndex, 1);
      this.$root.jobs.data.splice(this.editedIndex, 1);
      this.closeDelete();
      this.textAlert =
        "Pracovná pozícia " + this.editedItem.name + " bola úspešne vymazaná!";
      this.alertSuccess = true;
      this.dialogAlert = true;
    },

   // zatvaranie dialog. okien
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeShow() {
      this.dialogShow = false;
    },

    closeAlertDialog() {
      this.dialogAlert = false;
    },

    // ukladanie a uprava pozicii do tabulky a dat v main.js
    save() {
      if (this.editedItem.name === "" || !this.editedItem.salary) {
        this.textAlert =
          "Pracovnú pozíciu nie je možné uložiť, niesú vyplnené všetky údaje!";
        this.alertSuccess = false;
        this.dialogAlert = true;
        return;
      }
      if (!Number.isInteger(Number(this.editedItem.salary))) {
        this.textAlert =
          "Pracovnú pozíciu nie je možné uložiť, nezadali ste plat v tvare čísla!";
        this.alertSuccess = false;
        this.dialogAlert = true;
        return;
      }
      if (this.editedIndex > -1) {
        Object.assign(this.jobs[this.editedIndex], this.editedItem);
      } else {
        this.jobs.push(this.editedItem);
      }
      var job_id = -1;
      // ak pozícia este neexistuje
      if (this.$root.jobs.data[this.editedIndex] === undefined) {
        job_id = this.$root.jobs.data[this.$root.jobs.data.length - 1].id + 1;
        this.$root.jobs.data.push({
          id: job_id,
          name: this.editedItem.name,
          salary: this.editedItem.salary,
        });
        this.textAlert =
          "Pracovná pozícia " +
          this.editedItem.name +
          " bola uspešne pridaná! ";

        // ak uz pozícia existuje
      } else {
        this.$root.jobs.data[this.editedIndex].name = this.editedItem.name;
        this.$root.jobs.data[this.editedIndex].salary = this.editedItem.salary;
        this.textAlert =
          "Pracovná pozícia " + this.editedItem.name + " bola úspešne uložená!";
      }

      this.alertSuccess = true;
      this.dialogAlert = true;
      this.close();
    },
  },
};
</script>