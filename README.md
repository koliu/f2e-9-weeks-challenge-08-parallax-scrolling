# No.8 Parallax Scrolling

---

## [DEMO](dist/)

## [spec](https://hexschool.github.io/THE_F2E_Design/week8-parallax%20scrolling/)

- [preview](https://www.youtube.com/watch?v=xViDpVyIBoU)

## Note

[Vue.js - How to import a filter into a component from a separate file?](https://stackoverflow.com/questions/50976049/vue-js-how-to-import-a-filter-into-a-component-from-a-separate-file)

```html
//MyFilter.vue
<script>
  export default {
    capitalize: function(val){
      return val.toUpperCase();
    }
    //export filter as object
  }

  // Export an function does NOT work
  // export default function(val){
  //   return val.toUpperCase();
  // }
</script>


//MyComponent.vue
<template>
  <div>
    <p><input v-model="myInput"></p>
    <p>{{myInput | capitalize}}</p>
  </div>
 </template>

<script>
  import Capitalize from './MyFilter';
  //This import works

  export default {
    filters: {
      capitalize: Capitalize.capitalize
      //This filter works
    },

  data: function() {
    return {
      myInput: 'test'
    }
  }
}
</script>
```
