<template>
  <section class="detail" v-if="item.name">
    <h2>{{item.name.common}}</h2>
    <p>Capital {{item.capital[0]}}</p>
    <p>Area {{ item.area }} km</p>
    <div v-if="item.bordersName.length>0">
      <p>Borders</p>
      <ul>
        <li v-for="border in item.bordersName" :key="border.id">
          <a href="#" @click="changeCountry(border)">{{ border }}</a>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>There are no borders</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Country",
  props: ["item"],
  methods: {
    changeCountry(border) {
      
      this.$emit('changeCountry', border)

    },
  }
}

</script>

<style lang="sass">
@import 'index.sass'
</style>
