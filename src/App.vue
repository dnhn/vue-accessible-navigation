<template>
  <main id="app">
    <header>
      <h1>Accessible Drop Down Menu</h1>
    </header>

    <p class="guide">Use tab, arrow, number keys and your voice to navigate through the menu.</p>

    <nav role="navigation">
      <ul
        role="menu"
        class="access-menu">
        <li
          role="menuitem"
          :aria-haspopup="n.children && !!n.children.length"
          :aria-expanded="n.children && n.children.length > 0 && isItemFocused(n)"
          v-for="(n, index) in nav"
          :key="index"
          @mouseover="navItemFocus(n)"
          @mouseout="selectedNavItem = false"
          @keyup.left="prevNavItem(index, nav)"
          @keyup.right="nextNavItem(index, nav)"
          @keyup.down="n.children && !selectedNavChild ? nextNavChild(-1, n.children) : ''">
          <a
            v-change-focus
            :is-focused="n === selectedNavItem"
            @focus="navItemFocus(n)"
            href="#">{{n.name}}</a>
          <ul
            class="access-submenu"
            :class="{'is-show': isItemFocused(n)}"
            v-if="n.children && n.children.length">
            <li
              role="menuitem"
              v-for="(c, c_index) in n.children"
              :key="c_index"
              @keyup.up="prevNavChild(c_index, n.children)"
              @keyup.down="nextNavChild(c_index, n.children)">
              <a
                v-change-focus
                :is-focused="c === selectedNavChild"
                :href="`#${c_index}`">{{c}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
export default {
  name: 'app',
  directives: {
    changeFocus: {
      componentUpdated: (el, binding, vnode) => {
        vnode.data.attrs['is-focused'] ?
          el.focus() :
          el.blur()
      }
    }
  },
  data () {
    return {
      selectedNavItem: false,
      selectedNavChild: false,
      nav: [
        {
          name: 'Women',
          children: [
            'Featured',
            'Shoes',
            'Clothing',
            'Accessories',
            'Sports',
            'Sale'
          ]
        },
        {
          name: 'Men',
          children: [
            'Featured',
            'Shoes',
            'Clothing',
            'Accessories',
            'Sports',
            'Sale'
          ]
        },
        {
          name: 'Kids',
          children: [
            'Featured',
            'Boys',
            'Girls',
            'Infant',
            'Sale'
          ]
        },
        {
          name: 'Sale',
          children: [
            'Men\'s Sale',
            'Women\'s Sale',
            'Plus Sale',
            'Kids\' Sale'
          ]
        },
        { name: 'Customise' }
      ]
    }
  },
  methods: {
    navItemFocus (i) {
      this.selectedNavItem = i
    },
    isItemFocused (i) {
      return this.selectedNavItem === i
    },
    prevNavItem (index, siblings) {
      this.selectedNavChild = false
      const prevIndex = index - 1 < 0 ? siblings.length - 1 : index - 1
      const prevItem = siblings[prevIndex]

      this.navItemFocus(prevItem)
      this.selectedNavItem = prevItem
    },
    nextNavItem (index, siblings) {
      this.selectedNavChild = false
      const nextIndex = index + 1 > siblings.length - 1 ? 0 : index + 1
      const nextItem = siblings[nextIndex]

      this.navItemFocus(nextItem)
      this.selectedNavItem = nextItem
    },
    prevNavChild (index, siblings) {
      this.selectedNavChild = siblings[index - 1]
    },
    nextNavChild (index, siblings) {
      this.selectedNavChild = siblings[index + 1]
    }
  }
}
</script>

<style>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: 'calibri', sans-serif;
}

h1 {
  margin: 2em 0 0;
  text-align: center;
  text-transform: uppercase;
}

p {
  text-align: center;
  margin: 0;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.access-menu {
  display: table;
  margin: 1em auto;
}

.access-menu > li {
  background: #333;
  display: inline-block;
  position: relative;
}

.access-menu > li + li {
  border-left: solid 1px #000;
}

.access-menu a {
  color: #eee;
  display: block;
  padding: .5em 2em;
  text-decoration: none;
  -webkit-transition: all .2s linear;
  -moz-transition: all .2s linear;
  -ms-transition: all .2s linear;
  -o-transition: all .2s linear;
  transition: all .2s linear;
}

.access-menu a:hover,
.access-menu a:focus {
  background-color: #ccc;
  color: black;
}

.access-menu a:focus {
  outline: none;
}

.access-menu li:hover .access-submenu,
.access-menu a:hover ~ .access-submenu,
.access-menu a:focus ~ .access-submenu {
  display: block;
}

.access-submenu {
  background: #444;
  top: 100%;
  left: auto;
  position: absolute;
  width: 150%;
  display: none;
}

.access-submenu.is-show {
  display: block;
}

.access-submenu > li + li {
  border-top: solid 1px #000;
}

.access-submenu > li:last-child {
  border-bottom: solid 3px #000;
}

.access-submenu a {
  padding: .5em 1em;
}

.is-show {
  left: auto;
  top: 100%;
}

.guide {
  margin: 2em;
}
</style>
