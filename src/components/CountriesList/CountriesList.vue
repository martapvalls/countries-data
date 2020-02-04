<template>
  <section class="countries">
    <h2 class="countries__title">Countries</h2>
    <ul class="countries__list">
      <li class="countries__item" v-for="country in countries" :key="country.id">
        <a href="#" @click="showCountry(country)">{{ country.flag }} {{ country.name.official }}</a>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  name: "Countries",
  props: ["countries"],
  methods: {
    showCountry(country) {
      
      this.$emit('retrieveCountry', country)

    },
  }
};
</script>

<style lang="sass">
@import 'index.sass'
</style>
