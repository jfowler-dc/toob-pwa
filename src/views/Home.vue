<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {auth} from '../firebaseConfig'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      auth: auth
    }
  },
  methods: {
    getLines() {
      let url = 'https://lines.toob.workers.dev/'
      axios
        .get(url)
        .then( response => {
          console.log(response)
        })
        .catch( error => {
          console.log(error)
        })
    },
    getStationList() {
      let url = 'https://stationlist.toob.workers.dev/?LineCode=YL'
      axios
        .get(url)
        .then( response => {
          console.log(response)
        })
        .catch( error => {
          console.log(error)
        })
    }
  },
  mounted() {
    console.log(this.auth)
    this.getLines()
    this.getStationList()
  }
}
</script>
