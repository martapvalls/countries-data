<template>
  <div id="app" class="app">
    <Header></Header>
    <CountriesList :countries="countries" @retrieveCountry="retrieveCountry"></CountriesList>
    <CountryDetail :item="country" @changeCountry="changeCountry"></CountryDetail>
  </div>
</template>

<script>
import Header from "../Header/Header.vue";
import CountriesList from "../CountriesList/CountriesList.vue";
import CountryDetail from "../CountryDetail/CountryDetail.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Header,
    CountriesList,
    CountryDetail
  },
  data() {
    return {
      country: {},
      countries: null
    };
  },
  mounted() {
    this.getCountries();
  },
  methods: {
    retrieveCountry(countryData) {
      this.country = countryData;
    },
    ciocToName(countries) {
      for (let i = 0; i < countries.length; i++) {
        let borders = countries[i].borders;
        let bordersName = borders.map(border => {
          for (let j = 0; j < countries.length; j++) {
            if (border === countries[j].cioc || border === countries[j].cca3) {
              return countries[j].name.common;
            }
          }
        });
        countries[i].bordersName = bordersName;
      }
      return countries;
    },
    getCountries() {
      axios
        .get(
          "https://api.codetabs.com/v1/proxy?quest=https://techtest.cocunat.workers.dev/"
        )
        .then(res => {
          console.log(res);

          this.countries = this.ciocToName(res.data);
        })
        .catch(error => console.log(error));
    },
    changeCountry(border) {
      for (let i = 0; i < this.countries.length; i++) {
        if (border === this.countries[i].name.common) {
          return (this.country = this.countries[i]);
        }
      }
    }
  }
};
</script>

<style lang="sass">
@import 'index.sass'
</style>
