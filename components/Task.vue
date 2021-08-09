<template>
  <v-card>
    <v-toolbar>
      {{title}}
      <v-spacer></v-spacer>
      <slot name="actions"></slot>
    </v-toolbar>
    <v-row>
      <v-col class="col-8">
        <v-card-text>
          <div>
            <div class="title">
              Description
            </div>
            <p>
              {{description}}
            </p>
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
            v-if="id"
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
          <div class="mb-4">
            <div class="title">
              Assigné à
            </div>
            <div>{{ user.fullName }}</div>
          </div>
          <slot name="platform"></slot>
          <slot name="compte"></slot>
          <div class="mb-4">
            <div class="title">
              Nombre de mots
            </div>
            <div>
              {{ wordsNumber }} mots
            </div>
          </div>
          <slot name="price"></slot>
          <slot name="deadline"></slot>
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
      id: {
        type: String,
        required: true
      }
    },
    data: () => ({
      pjCount: 0,
      startDateLine: (new Date(Date.now())).toISOString().substr(0, 10),
      startHourLine : new Date().toLocaleTimeString('fr-FR', { hour12: false }),
      deadline: {
        date: '',
        hour: '',
      },
      status: {
        list: [],
        selected: {}
      },
      user: {},
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
      '$store.state.tasks.list': function() {
        this.build()
      },
      '$store.state.users.list': function() {
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
        const status = this.$store.state.status.list
        const tasks = this.$store.state.tasks.list

        const task = tasks
          .filter(t => t.id == this.id)[0]
        
        this.title = task.title
        this.description = task.description
        this.wordsNumber = task.wordsNumber

        this.user = users
          .map(u => {
            u['fullName'] = u.name + ' ' + u.firstName
            return u
          })
          .filter(u => u.id == task.agent)[0]

        this.status.selected = status
            .filter(s => s.code == task.status)[0]
        this.status.list = this.getPossibleStatus(this.status.selected)


      },
      changeStatus() {
        this.status.list = this.getPossibleStatus(this.status.selected)
        this.$tasks.updateStatus(this.id, this.status.selected)
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
