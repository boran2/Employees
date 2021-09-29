import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  data: function () {
    return {
      menuOption: 1,
      jobs: {
        headers: [
          {
            text: "NÁZOV PRACOVNEJ POZÍCIE",
            value: "name",
            class: "grey darken-1 white--text"
          },
          { text: "ŠTANDARDNÝ PLAT V €", value: "salary",class: "grey darken-1 white--text"},
          { text: "", value: "actions", sortable: false, class: "grey darken-1 white--text"},
        ],
        data: [
          {
            id: 1,
            name: "Web developer",
            salary: 1600,
          },
          {
            id: 2,
            name: "Java programator",
            salary: 1800,
          },
          {
            id: 3,
            name: "UX Dizajnér",
            salary: 1600,
          },
          {
            id: 4,
            name: "IT manažér",
            salary: 2200,
          },
          {
            id: 5,
            name: "Riaditeľ",
            salary: 3000,
          },
          {
            id: 6,
            name: "Asistenčné služby",
            salary: 600,
          },
          {
            id: 7,
            name: "Manažér predaja",
            salary: 2600,
          },
        ]
      },
      persons: {
        headers: [
          {
            text: "MENO",
            value: "name",
            class: "grey darken-1 white--text"
          },
          {
            text: "PRIEZVISKO", value: "surname",
            class: "grey darken-1 white--text"
          },
          {
            text: "TITULY", value: "titles",
            class: "grey darken-1 white--text"
          },
          {
            text: "EMAIL", value: "mail",
            class: "grey darken-1 white--text"
          },
          {
            text: "TELEFÓN", value: "phone",
            class: "grey darken-1 white--text"
          },
          {
            text: "PRACOVNÁ POZÍCIA", value: "position",
            class: "grey darken-1 white--text"
          },
          {
            text: "PLAT V €", value: "salary",
            class: "grey darken-1 white--text"
          },
          {
            text: "", value: "actions", sortable: false,
            class: "grey darken-1 white--text"
          },
        ],
        data: [
          {
            name: "Juraj",
            surname: "Novák",
            titles: "Mgr.",
            mail: "juraj.novak@gmail.com",
            phone: "0956543987",
            id_job: 1,
            salary: 1600,
          },
          {
            name: "Pavol",
            surname: "Kováč",
            titles: "Phd.",
            mail: "kovacpavol@centrum.sk",
            phone: "0967326118",
            id_job: 2,
            salary: 1800,
          },
          {
            name: "Adam",
            surname: "Tóth",
            titles: "Bc.",
            mail: "adam.toth@gmail.com",
            phone: "0978543299",
            id_job: 3,
            salary: 1600,
          },
          {
            name: "Jana",
            surname: "Olejníková",
            titles: "Ing.",
            mail: "olejnikova67@zoznam.sk",
            phone: "0956732481",
            id_job: 4,
            salary: 2200,
          },
          {
            name: "Mária",
            surname: "Pospíšilová",
            titles: "Mgr.",
            mail: "pospisilova21@gmail.com",
            phone: "0987244612",
            id_job: 5,
            salary: null,
          },
          {
            name: "Jozef",
            surname: "Ondriš",
            titles: "",
            mail: "ondris12@azet.sk",
            phone: "0955834783",
            id_job: 6,
            salary: 600,
          },
          {
            name: "Ján",
            surname: "Chlebana",
            titles: "Bc.",
            mail: "jan.chlebana@gmail.com",
            phone: "0912847394",
            id_job: 1,
            salary: 1600,
          },
          {
            name: "Branislav",
            surname: "Novák",
            titles: "Ing.",
            mail: "novak234@centrum.sk",
            phone: "0914658943",
            id_job: 2,
            salary: null,
          },
          {
            name: "Bruno",
            surname: "Ondriška",
            titles: "",
            mail: "ondriska18@gmail.com",
            phone: "0957489723",
            id_job: 6,
            salary: 600,
          },
          {
            name: "Zuzana",
            surname: "Javorová",
            titles: "",
            mail: "javorova32@zoznam.sk",
            phone: "0910456734",
            id_job: 6,
            salary: 600,
          },
          {
            name: "Hana",
            surname: "Gregorovičová",
            titles: "Phd.",
            mail: "hana.gregorovicova@gmail.com",
            phone: "0910436764",
            id_job: 7,
            salary: 2600,
          },
          {
            name: "Rastislav",
            surname: "Žiška",
            titles: "",
            mail: "ziska32@zoznam.sk",
            phone: "0910416744",
            id_job: 6,
            salary: 600,
          },
        ]
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
