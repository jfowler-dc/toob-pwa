<template>
  <div class="flex py-4 items-center justify-between">
    <div class="flex items-center">
        <div class="w-12 h-12 rounded-full mr-2.5 flex items-center justify-center text-white"
            :class="line">
            <span class="text-xl uppercase font-bold">
                {{line}}
            </span>
        </div>
        <h3 class="font-bold text-lg">{{destinationName}}</h3>
    </div>
    <div>
        <span class="text-3xl font-bold">{{returnTimeRemaining}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Train",
  props: {
    destinationName: String,
    minutes: String,
    line: String
  },
  data() {
    return {
      
    };
  },
  created() {

  },
  methods: {

  },
  computed: {
    returnTimeRemaining() {
        if (this.minutes != '' && this.minutes != 'ARR' && this.minutes != 'BRD') {
            return this.minutes + ' Min'
        } else if (this.minutes == 'ARR') {
            return this.minutes
        } else if (this.minutes == 'BRD') {
            return this.minutes
        } else {
            return '?'
        }
    }
  },
  
}

</script>

<style scoped>

</style>