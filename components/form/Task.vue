<template>
  <v-card>
    <v-toolbar>
      <span>
        {{title}}
      </span>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          color="green"
          icon
          @click="slug ? updateTask() : saveTask()"
        >
          <v-icon>mdi-content-save-outline</v-icon>
        </v-btn>
        <v-btn
          color="red"
          icon
          v-if="this.$route.params.id"
          @click="deleteTask()"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-row>
      <v-col class="col-8">
        <v-card-text>
          <div>
            <div class="title">
              Titre
            </div>
            <v-text-field
              v-model="title"
              required
            ></v-text-field>
          </div>
          <div>
            <div class="title">
              Description
            </div>
            <v-textarea
              v-model="description"
              filled
              auto-grow
            ></v-textarea>
          </div>
          <div class="mb-4">
            <div class="title">
              Fichiers jointes
              <v-btn
                icon
                color="green"
                @click="addPj()"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-file-input
                v-for="i in pjCount"
                :key="i"
                label="File input"
              ></v-file-input>
            </div>
          </div>
          <v-divider></v-divider>
          <div 
            class="my-4"
            v-if="slug"
          >
            <div class="title mb-2">
              Commentaires
            </div>
            <div>
              <v-row 
                v-for="(comment) in comments"
                :key="comment.date"
                class="mb-2"
              >
                <v-col>
                  <div class="subtitle-1">
                    {{ comment.user.name }} {{ comment.user.firstName }} . {{ $moment(comment.date) }}
                  </div>
                  {{ comment.text }}
                </v-col>
              </v-row>
            </div>
            <v-textarea
              filled
              label="Votre commentaire"
              auto-grow
              :v-model="comment"
            ></v-textarea>
            <v-btn
              color="primary"
              @click="addComment"
            >
              Envoyer
            </v-btn>
          </div>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-text>
          <div>
            <div class="title">
              Statut
            </div>
            <v-select
              :items="status.list"
              v-model="status.selected"
              item-text="label"
              item-value="code"
              return-object
              dense
              outlined
              @change="changeStatus"
            ></v-select>
          </div>
          <slot name="commande"></slot>
          <div>
            <div class="title">
              Assigné à
            </div>
            <v-select
              :items="user.list"
              v-model="user.selected"
              item-text="fullName"
              item-value="id"
              return-object
              dense
              outlined
            ></v-select>
          </div>
          <div>
            <div class="title">
              Plateforme
            </div>
            <v-select
              :items="platform.list"
              v-model="platform.selected"
              item-text="name"
              item-value="id"
              return-object
              dense
              outlined
            ></v-select>
          </div>
          <div>
            <div class="title">
              Compte
            </div>
            <v-select
              :items="compte.list"
              v-model="compte.selected"
              item-text="name"
              item-value="id"
              return-object
              dense
              outlined
            ></v-select>
          </div>
          <div>
            <div class="title">
              Nombre de mots
            </div>
            <v-text-field
              v-model="wordsNumber"
              suffix="mots"
              outlined
            ></v-text-field>
          </div>
          <div>
            <div class="title">
              Revenue
            </div>
            <v-text-field
              v-model="price"
              suffix="€"
              outlined
            ></v-text-field>
          </div>
          <div class="mb-4">
            <div class="title">
              Date butoire
            </div>
            <div>
              <v-menu
                v-model="deadline.date.menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="deadline.date.value"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="deadline.date.value"
                  @input="deadline.date.menu = false"
                ></v-date-picker>
              </v-menu>
              <v-menu
                ref="hourDeadLine"
                v-model="deadline.hour.menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="deadline.hour.menu"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="deadline.hour.value"
                    label="Heure"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="deadline.hour.menu"
                  ampm-in-title
                  v-model="deadline.hour.value"
                  full-width
                  @click:minute="$refs.hourDeadLine.save(deadline.hour.value)"
                ></v-time-picker>
              </v-menu>
            </div>
          </div>
          <div
            v-if="elapsedTime != 0"
          >
            <div class="mb-4">
              <div class="title">
                Date début
              </div>
              {{startDateLine}} à {{startHourLine}}
            </div>
            <div class="mb-4">
              <div class="title">
                Temps passé
              </div>
              <p
                class="text-h2 font-weight-bold red--text"
              >{{formattedElapsedTime}}</p>
            </div>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    props: {
      slug: String,
      required: true
    },
    data: () => ({
      pjCount: 0,
      startDateLine: (new Date(Date.now())).toISOString().substr(0, 10),
      startHourLine : new Date().toLocaleTimeString('fr-FR', { hour12: false }),
      deadline: {
        date: {
          value: null,
          menu: false,
        },
        hour: {
          value: null,
          menu: false,
        },
      },
      status: {
        list: [],
        selected: {}
      },
      user: {
        list: [],
        selected: {}
      },
      compte: {
        list: [],
        selected: {}
      },
      platform: {
        list: [],
        selected: {}
      },
      id: '',
      commandId: '',
      title: '',
      description: '',
      comments: [
        {
          user: {},
          date: null,
          text: ''
        }
      ],
      comment: '',
      price: 0,
      elapsedTime: 0,
      timer: undefined,
      wordsNumber: 0
    }),
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
      '$store.state.status.list': function() {
        this.build()
      }
    },
    mounted() {
      this.build()
    },
    methods: {
      build() {
        this.user.list = this.$store.state.users.list
          .map(u => {
            u['fullName'] = u.name + ' ' + u.firstName
            return u
          })
        this.compte.list = this.$store.state.comptes.list
        this.platform.list = this.$store.state.platforms.list

        this.id = this.$route.params.slug

        // En création
        if (!this.id) {
          this.user.selected = this.user.list[0]
          this.platform.selected = this.platform.list[0]
          this.compte.selected = this.compte.list.filter(c => c.platform = this.platform.selected.id)[0]
          this.status.list = this.$store.state.status.list
            .filter(s => s.code == 1)
          this.status.selected = this.status.list[0]
          this.status.readOnly = true

          var today = new Date();
          this.deadline.date.value = today.toISOString().substr(0, 10)
          today.setHours(today.getHours() + 8);
          this.deadline.hour.value = today.getHours() + ':' + today.getMinutes()
        } else { 
          // En edition
          const task = this.$store.state.tasks.list
            .filter(t => t.id == this.id)[0]
            
          this.status.selected = this.$store.state.status.list
            .filter(s => s.code == task.status)[0]
          this.status.list = this.getPossibleStatus(this.status.selected)

          this.commandId = task.commandId
          this.title = task.title
          this.description = task.description
          this.price = task.price
          this.wordsNumber = task.wordsNumber

          this.user.selected = this.user.list
            .filter(u => u.id == task.agent)[0]

          this.platform.selected = this.platform.list
            .filter(p => p.id == task.platform)[0]

          this.compte.selected = this.compte.list
            .filter(p => p.id == task.compte)[0]

          this.deadline.date.value = task.deadline.date
          this.deadline.hour.value = task.deadline.hour
        }
      },
      changeStatus() {
        if (this.slug) {
          this.status.list = this.getPossibleStatus(this.status.selected)
          this.$tasks.updateStatus(this.slug, this.status.selected)
        }
      },
      start() {
        this.timer = setInterval(() => {
          this.elapsedTime += 1000;
        }, 1000);
      },
      stop() {
        clearInterval(this.timer);
      },
      addPj() {
        this.pjCount++;
      },
      addComment() {
        this.comments.push({
          text: this.comment,
          user: this.$store.state.auth.loggedUser,
          date: new Date()
        })
      },
      saveTask() {
        var today = new Date()
        this.$tasks.add({
          commandId: this.commandId,
          title: this.title,
          description: this.description,
          price: this.price,
          wordsNumber: this.wordsNumber,

          agent: this.user.selected.id,
          platform: this.platform.selected.id,
          compte: this.compte.selected.id,

          deadline: {
            date: this.deadline.date.value,
            hour: this.deadline.hour.value
          },

          status: this.status.selected.code,

          dataCreation: today
        })

        this.$router.push('/admin/task/list/');
      },
      updateTask() {
        var today = new Date()
        this.$tasks.update({
          id: this.id,
          commandId: this.commandId,
          title: this.title,
          description: this.description,
          price: this.price,
          wordsNumber: this.wordsNumber,

          agent: this.user.selected.id,
          platform: this.platform.selected.id,
          compte: this.compte.selected.id,

          deadline: {
            date: this.deadline.date.value,
            hour: this.deadline.hour.value
          },

          status: this.status.selected.code,

          dataModification: today
        })

        this.$router.push('/admin/task/list/');
      },
      deleteTask() {
        this.$tasks.remove(this.id)
        this.$router.push('/admin/task/list/');
      }
    },
    computed: {
      formattedElapsedTime() {
        const date = new Date(null);
        date.setSeconds(this.elapsedTime / 1000);
        const utc = date.toUTCString();
        return utc.substr(utc.indexOf(":") - 2, 8);
      },
      ...mapGetters('status', ['getPossibleStatus'])
    },
  }
</script>
