<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    
    <li 
    v-for="link in links" 
    :key="link.url">

      <router-link
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exect"
      >
        <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
      </router-link>
    </li>
  </ul>
</template>

<script>

export default {
 
  name: 'Sidebar',
  props: ['value'],
  data(){
    return{
      links: [ 
          { title: 'Счет', url: '/', exect:true },
          { title: 'История', url: '/history' },
          { title: 'Планирование', url: '/planning' },
          { title: 'Новая запись', url: '/record' },
          { title: 'Категории', url: '/categories' }
        ]
    }
  },
}
</script>
