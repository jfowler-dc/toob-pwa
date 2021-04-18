<template>
  <div class="mt-4">
    <div class="flex items-begin justify-between">
        <div>
            <h2 class="mb-2.5 text-lg font-bold">{{name}}</h2>
            <p class="text-base" v-if="address != '' ">{{address.Street}}<br>{{address.City}} {{address.State}}, {{address.Zip}}</p>
        </div>
        <div class="flex items-begin ">
            <div class="flex">
                <div class="w-5	h-5 train-line rounded-full ml-2.5"
                    v-for="(line, key) in stationLines"
                    :key="key"
                    :class="line">
                </div>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {auth} from '../firebaseConfig'

import axios from 'axios'

export default {
  name: 'StationView',
  components: {
    
  },
  data() {
    return {
      auth: auth,
      trains: Array,
      name: String,
      address: Object,
      lineCode1: String,
      lineCode2: String,
      lineCode3: String,
      lineCode4: String
    }
  },
  methods: {
    getNextTrains() {
      let url = 'https://nexttrains.toob.workers.dev?StationCode=' + this.$route.params.stationCode
      axios
        .get(url)
        .then( response => {
          this.trains = response.data.Trains
        })
        .catch( error => {
          console.log(error)
        })
    },
    getStationInfo() {
      let url = 'https://stationinfo.toob.workers.dev?StationCode=' + this.$route.params.stationCode
      axios
        .get(url)
        .then( response => {
          this.name = response.data.Name
          this.address = response.data.Address
          this.lineCode1 = response.data.LineCode1
          this.lineCode2 = response.data.LineCode2
          this.lineCode3 = response.data.LineCode3
          this.lineCode4 = response.data.LineCode4
        })
        .catch( error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getNextTrains()
    this.getStationInfo() 
  },
  computed: {
    stationLines() {
      let lines = [this.lineCode1, this.lineCode2, this.lineCode3, this.lineCode4]
      let stationLines = []
      lines.forEach(e => {
        if (e != null) {
          stationLines.push(e)
        }
      })
      return stationLines
    }
  }
}
</script>
