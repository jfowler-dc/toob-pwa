<template>
  <div>
    <nav
      class="navbar w-64 absolute overflow-x-scroll bg-white border-black border-r-4 border-solid top-0 left-0 h-screen z-50 px-8 py-4"
      :class="open ? 'navbar-open' : 'navbar-close'"
      v-clickoutside="hideNavigation">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl text-left font-bold">Menu</h2>
        <button 
          @click="toggleNavigation" 
          class="text-black text-2xl font-bold">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <ul class="list-none text-black text-left">
        <li
          class="text-2xl font-bold mb-2" 
          v-for="(item, key) in navigationItems" 
          :key="key">
          <router-link :to="item.url" @click.native="hideNavigation">{{item.title}}</router-link>
        </li>
      </ul>

    </nav>

    <header
      class="flex items-center py-6 border-b-4 solid border-black">
      <div :class="open ? 'opacity-25' : 'opacity-100'">
        <button 
          @click="toggleNavigation" 
          class="text-black text-2xl font-bold">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <h1 class="text-center w-full text-4xl font-bold">{{$route.name}}</h1>
    </header>

  </div>
</template>
<script>
export default {
  name: "Navigation",
  props: {
    title: String
  },
  data() {
    return {
      open: false,
      navigationItems: [
        {
          title: 'All Stations',
          url: '/'
        },
        {
          title: 'Saved',
          url: '/saved'
        },
        {
          title: 'About',
          url: '/about'
        },
      ]
    };
  },
  created() {

  },
  methods: {
    toggleNavigation() {
      this.open = !this.open
    },
    hideNavigation() {
      this.open = false
    }
  },
  directives: {
    clickoutside: {
      bind: function (el, binding, vnode) {
        console.log('bind')
        el.clickOutsideEvent = function (event) {
          if (vnode.context.showFilterContents == true) {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event)
            }
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent)
      },
      unbind: function (el) {
        console.log('unbind')
        document.body.removeEventListener("click", el.clickOutsideEvent)
      },
      stopProp: function (event) {
        console.log('stop')
        event.stopPropagation()
      }
    }
  }
}




</script>

<style scoped>
.navbar {
  transition: all 200ms ease-out;
}

.navbar-open {
  transform: translateX(0%);
}
.navbar-close {
  transform: translateX(-100%);
}
</style>