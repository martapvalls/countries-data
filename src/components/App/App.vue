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
  created() {
    this.getCountries();
  },
  updated() {
    this.loadCountry();
  },
  methods: {
    // retrieveCountry sets the country to be shown when user selects from CountriesList
    retrieveCountry(countryData) {
      this.country = countryData;
      let cca2 = this.country.cca2;
      this.$router.push(cca2);
    },
    //this function allows to navigate between countries, for example /ES will show Spain
    loadCountry() {
      let cca2 = this.$route.params.cca2;
      for (let i = 0; i < this.countries.length; i++) {
        if (cca2 === this.countries[i].cca2) {
          return (this.country = this.countries[i]);
        }
      }
    },
    //ciocToName sanitizes borders, it changes cca3 to common name for better user experience
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
    //getCountries does the call to API to get data from countries, then calls ciocToName to do the sanitizing 
    getCountries() {
      axios
        .get(
          "https://api.codetabs.com/v1/proxy?quest=https://techtest.cocunat.workers.dev/"
        )
        .then(res => {
          this.countries = this.ciocToName(res.data);
        })
        .catch(error => console.log(error));
    },
    //changeCountry changes the country to be shown when clicks on borders in CountryDetail
    changeCountry(border) {
      for (let i = 0; i < this.countries.length; i++) {
        if (border === this.countries[i].name.common) {
          let cca2 = this.countries[i].cca2;
          this.$router.push(cca2);
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
