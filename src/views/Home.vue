<template>
  <div class="mt-4">
    <station 
      v-for="(station, key) in stationList" 
      :key="key" 
      :name="station.Name"
      :lineCode1="station.LineCode1"
      :lineCode2="station.LineCode2"
      :lineCode3="station.LineCode3"
      :lineCode4="station.LineCode4"
      :latitude="station.Lat"
      :longitude="station.Lon"
      :code="station.Code"
      :address="station.Address" />
  </div>
</template>

<script>
// @ is an alias to /src
import Station from '@/components/Station.vue'
import {auth} from '../firebaseConfig'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Station
  },
  data() {
    return {
      auth: auth,
      stationList: Array
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
    getTrainList() {
      let url = 'https://stationlist.toob.workers.dev/'
      axios
        .get(url)
        .then( response => {
          this.stationList = response.data.Stations.sort(this.sortAlphabetize)
        })
        .catch( error => {
          console.log(error)
        })
    },
    sortAlphabetize(a, b) {
      if (a.Name < b.Name)
        return - 1;
      if (a.Name > b.Name)
        return 1;
      return 0;
    }
  },
  mounted() {
    console.log(this.auth)
    this.getLines()
    this.getTrainList()
  }
}
</script>
