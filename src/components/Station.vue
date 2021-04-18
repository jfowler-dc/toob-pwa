<template>
    <div class="flex justify-between items-center pb-5 mb-4 border-b solid border-gray-300">
        <router-link :to="'/station/' + code">
          <div>
              <h2 class="mb-2.5 text-lg font-bold">{{name}}</h2>
              <div class="flex items-center ">
                  <div class="w-5	h-5 train-line rounded-full mr-2.5"
                    v-for="(line, key) in stationLines"
                    :key="key"
                    :class="line"></div>
              </div>
          </div>
        </router-link>
        <div>
            <i class="far fa-bookmark"></i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Station',
  props: {
    name: String,
    lineCode1: String,
    lineCode2: String,
    lineCode3: String,
    lineCode4: String,
    latitude: Number,
    longitude: Number,
    code: String,
    address: Object
  },
  data() {
    return {
      lines: [this.lineCode1, this.lineCode2, this.lineCode3, this.lineCode4]
    }
  },
  methods: {
    
  },
  created() {
    
  },
  computed: {
    stationLines() {
      let lines = []
      this.lines.forEach(e => {
        if (e != null) {
          lines.push(e)
        }
      })
      return lines
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>