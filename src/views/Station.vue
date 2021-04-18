<template>
  <div class="mt-4">
    <div class="flex flex-col">
        
        <div class="flex items-begin justify-between pb-4 border-b solid border-gray-300 mb-2">
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

        <div>
            <transition-group name="flip-list" tag="ul">
                <train 
                    v-for="(train, key) in trains" 
                    :key="key" 
                    :destinationName="train.DestinationName"
                    :minutes="train.Min"
                    :line="train.Line" />
            </transition-group>
        </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {auth} from '../firebaseConfig'
import axios from 'axios'

import Train from '../components/Train.vue'

export default {
  name: 'StationView',
  components: {
    Train
  },
  data() {
    return {
      auth: auth,
      trains: Array,
      name: '',
      address: Object,
      lineCode1: String,
      lineCode2: String,
      lineCode3: String,
      lineCode4: String
    }
  },
  methods: {
    getNextTrains() {
        this.trains = []
      let url = 'https://nexttrains.toob.workers.dev?StationCode=' + this.$route.params.stationCode
      axios
        .get(url)
        .then( response => {
          this.trains = response.data.Trains.sort(this.sortMinutes)
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
    },
    sortDestination(a, b) {
      if (a.DestinationName < b.DestinationName)
        return - 1;
      if (a.DestinationName > b.DestinationName)
        return 1;
      return 0;
    },
    sortMinutes(a, b) {
      if (a.Min < b.Min)
        return + 1;
      if (a.Min > b.Min)
        return 1;
      return 0;
    },
    runNextTrainsScript() {
      this.getNextTrains()

      setInterval(() => {
        this.getNextTrains()
      }, 30000)
    },
  },
  mounted() {
    this.runNextTrainsScript()
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

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>