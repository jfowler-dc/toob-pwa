<template>
  <div>
    <nav
      :class="open ? 'navbar-open' : 'navbar-close'"
      class="navbar w-64 absolute overflow-x-scroll bg-gray-700 top-0 left-0 h-screen z-50"
      v-clickoutside="hideNavigation">

      <div class="flex pr-2 justify-end">
        <button 
          @click="toggleNavigation" 
          class="p-2 text-white text-xl font-bold">
          &#9747;
        </button>
      </div>
      
      <h2 class="text-xl text-center font-bold pt-5">Menu</h2>

      <ul class="list-none text-white text-center">
        <li v-for="(item, key) in navigationItems" :key="key">
          <router-link :to="item.url" @click.native="hideNavigation">{{item.title}}</router-link>
        </li>
      </ul>

    </nav>

    <header
      class="flex items-center py-6 border-b-4 solid border-black">
      <div :class="open ? 'opacity-25' : 'opacity-100'">
        <button 
          @click="toggleNavigation" 
          class="text-black text-2xl p-2 font-bold">
          &#9776;
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
          title: 'Home',
          url: '/'
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
      this.open = !this.open;
    },
    hideNavigation() {
      this.open = false
    }
  },
  directives: {
    clickoutside: {
      bind: function (el, binding, vnode) {
        console.log('test')
        el.clickOutsideEvent = function (event) {
          if (vnode.context.showFilterContents == true) {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event);
            }
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
      stopProp: function (event) {
        event.stopPropagation();
      }
    }
  }
};




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