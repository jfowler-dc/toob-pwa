<template>
  <div class="mt-4" v-if="stationInfo">
    <div>
        <h2 class="mb-2.5 text-lg font-bold">{{stationInfo.Name}}</h2>
        <p class="text-base" v-if="stationInfo.Address != '' ">{{stationInfo.Address.Street}}<br>{{stationInfo.Address.City}} {{stationInfo.Address.State}}, {{stationInfo.Address.Zip}}</p>
    </div>
    <div v-if="stationInfo.Address != '' ">
        <iframe :src="'https://maps.google.com/maps?q=' + stationInfo.Address.Lat +','+ stationInfo.Address.Lon + '&z=15&output=embed&key='" width="360" height="270" frameborder="0" style="border:0"></iframe>
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
      stationInfo: {
          Name: '',
          Address: ''
      }
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
          this.stationInfo = response.data
        })
        .catch( error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getNextTrains()
    this.getStationInfo() 
  }
}
</script>
