<template>
  <section class="detail" v-if="item.name">
    <h2 class="detail__title">{{item.name.common}}</h2>
    <p class="detail__data">Capital: {{item.capital[0]}}</p>
    <p class="detail__data">Area: {{ item.area }} km²</p>
    <div v-if="item.bordersName.length>0" class="detail__data">
      <ul class="detail__list">
        <p class="detail__border">Borders:</p>
        <li v-for="border in item.bordersName" :key="border.id" class="detail__item">
          <a href="/" @click="changeCountry(border)">{{ border }}</a>
        </li>
      </ul>
    </div>
    <div v-else class="detail__data">
      <p>There are no borders</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Country",
  props: ["item"],
  methods: {
    //this method gives the data to be shown to father component to set the country and change its value
    changeCountry(border) {
      event.preventDefault();
      this.$emit("changeCountry", border);
    }
  }
};
</script>

<style lang="sass">
@import 'index.sass'
</style>
