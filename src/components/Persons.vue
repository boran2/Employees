<template>
  <v-container fluid style="height: 90vh" class="pt-16 pb-16">
    <v-row class="mt-5">
      <v-col class="text-center" cols="12">
        <h1 class="headline">Zoznam zamestnancov</h1>
      </v-col>
    </v-row>
    <v-row class="text-center mt-5">
      <v-col cols="12">
        <v-data-table
          style="padding: auto auto"
          :headers="headers"
          :items="persons"
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
                    x-small
                    class="mt-10"
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
                      >Vytvoriť alebo upraviť zamestnanca {{ editedItem.name }}
                      {{ editedItem.surname }}</span
                    >
                    <span v-else class="text-h6 white--text"
                      >Vytvoriť zamestnanca</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="* MENO"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.surname"
                            label="* PRIEZVISKO"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.titles"
                            label="TITULY"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.mail"
                            label="* EMAIL"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.phone"
                            label="* TELEFÓN"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.position"
                            label="* PRACOVNÁ POZÍCIA"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.salary"
                            label="PLAT V €"
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
                    >Naozaj chcete vymazať zamestnanca {{ editedItem.name }}
                    {{ editedItem.surname }}?</v-card-title
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
                    {{ editedItem.name }} {{ editedItem.surname }}
                  </v-card-title>
                  <v-row class="pl-6" v-if="editedItem.titles">
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1">získané tituly: </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1"
                        ><strong>{{ editedItem.titles }}</strong></span
                      ></v-col
                    >
                  </v-row>
                  <v-row class="pl-6" v-if="editedItem.mail">
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1">e-mail: </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1"
                        ><strong>{{ editedItem.mail }}</strong></span
                      ></v-col
                    >
                  </v-row>
                  <v-row class="pl-6" v-if="editedItem.phone">
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1">telefónne číslo: </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1"
                        ><strong>{{ editedItem.phone }}</strong></span
                      ></v-col
                    >
                  </v-row>
                  <v-row class="pl-6" v-if="editedItem.position">
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1">pracovná pozícia: </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1"
                        ><strong>{{ editedItem.position }}</strong></span
                      ></v-col
                    >
                  </v-row>
                  <v-row class="pl-6" v-if="editedItem.salary">
                    <v-col cols="12" sm="6" md="6">
                      <span class="body-1">plat: </span>
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
    persons: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      surname: "",
      titles: "",
      mail: "",
      phone: "",
      position: "",
      salary: null,
    },
    defaultItem: {
      name: "",
      surname: "",
      titles: "",
      mail: "",
      phone: "",
      position: "",
      salary: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Pridať osobu" : "Upraviť osobu";
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
    // nacitanie osob z main.js
    initialize() {
      this.headers = this.$root.persons.headers;
      for (var i = 0; i < this.$root.persons.data.length; i++) {
        var person = {
          name: "",
          surname: "",
          titles: "",
          mail: "",
          phone: "",
          position: "",
          salary: null,
        };
        person.name = this.$root.persons.data[i].name;
        person.surname = this.$root.persons.data[i].surname;
        person.titles = this.$root.persons.data[i].titles;
        person.mail = this.$root.persons.data[i].mail;
        person.phone = this.$root.persons.data[i].phone;

        for (var j = 0; j < this.$root.jobs.data.length; j++) {
          if (
            this.$root.jobs.data[j].id === this.$root.persons.data[i].id_job
          ) {
            person.position = this.$root.jobs.data[j].name;
            if (!this.$root.persons.data[i].salary) {
              person.salary = this.$root.jobs.data[j].salary;
            } else {
              person.salary = this.$root.persons.data[i].salary;
            }
          }
        }
        this.persons.push(person);
      }
    },

    // otvaranie dialog. okien
    showItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogShow = true;
    },

    editItem(item) {
      this.editedIndex = this.persons.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.persons.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    // styl tabulky
    itemRowBackground: function (item) {
      return item.protein > 4.2 ? "style-1" : "style-2";
    },

    // vymazanie osob z tabulky a z dat
    deleteItemConfirm() {
      if (this.editedIndex > this.persons.length) {
        this.textAlert =
          "Zamestnanca nie je možné vymazať, zlé id zamestnanca!";
        this.alertSuccess = false;
        this.dialogAlert = true;
        return;
      }
      this.persons.splice(this.editedIndex, 1);
      this.$root.persons.data.splice(this.editedIndex, 1);
      this.closeDelete();
      this.textAlert =
        "Zamestnanec " +
        this.editedItem.name +
        " " +
        this.editedItem.surname +
        " ból úspešne vymazaný!";
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

    // vkladanie a modifikacia osob do tabulky, do dat v main.js ako aj pripadnych novych prac. pozicii
    save() {
      this.textAlert = "";
      if (
        this.editedItem.name === "" ||
        this.editedItem.surname === "" ||
        this.editedItem.mail === "" ||
        this.editedItem.phone === "" ||
        this.editedItem.position === ""
      ) {
        this.textAlert =
          "Zamestnanca nie je možné uložiť, niesú vyplnené všetky potrebné údaje!";
        this.alertSuccess = false;
        this.dialogAlert = true;
        return;
      }
      if (!Number.isInteger(Number(this.editedItem.salary))) {
        this.textAlert =
          "Zamestnanca nie je možné uložiť, nezadali ste plat v tvare čísla!";
        this.alertSuccess = false;
        this.dialogAlert = true;
        return;
      }

      // modifikacia zobrazenych osob
      if (this.editedIndex > -1) {
        Object.assign(this.persons[this.editedIndex], this.editedItem);
      } else {
        this.persons.push(this.editedItem);
      }

      var job_id = -1;

      // ak upravena pozicia uz existuje,
      for (var i = 0; i < this.$root.jobs.data.length; i++) {
        if (this.editedItem.position === this.$root.jobs.data[i].name) {
          job_id = this.$root.jobs.data[i].id;
        }
      }

      // ak upravena pozicia este neexistuje
      if (job_id === -1) {
        job_id = this.$root.jobs.data[this.$root.jobs.data.length - 1].id + 1;
        this.$root.jobs.data.push({
          id: job_id,
          name: this.editedItem.position,
          salary: this.editedItem.salary,
        });
        this.textAlert =
          "Pracovná pozícia " +
          this.editedItem.position +
          " bola úspešne pridaná! ";
      }

      // ak osoba este neexistuje
      if (this.$root.persons.data[this.editedIndex] === undefined) {
        this.$root.persons.data.push({
          name: this.editedItem.name,
          surname: this.editedItem.surname,
          titles: this.editedItem.titles,
          mail: this.editedItem.mail,
          phone: this.editedItem.phone,
          job_id: job_id,
          salary: this.editedItem.salary,
        });

        // ak uz osoba existuje
      } else {
        this.$root.persons.data[this.editedIndex].name = this.editedItem.name;
        this.$root.persons.data[this.editedIndex].surname =
          this.editedItem.surname;
        this.$root.persons.data[this.editedIndex].titles =
          this.editedItem.titles;
        this.$root.persons.data[this.editedIndex].mail = this.editedItem.mail;
        this.$root.persons.data[this.editedIndex].phone = this.editedItem.phone;
        this.$root.persons.data[this.editedIndex].job_id = job_id;
        this.$root.persons.data[this.editedIndex].salary =
          this.editedItem.salary;
      }

      this.textAlert =
        this.textAlert +
        "Zamestnanec " +
        this.editedItem.name +
        " " +
        this.editedItem.surname +
        " ból úspešne uložený!";
      this.alertSuccess = true;
      this.dialogAlert = true;
      this.close();
    },
  },
};
</script>