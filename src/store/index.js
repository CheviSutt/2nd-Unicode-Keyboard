import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// export const store = new Vuex.Store({
export default new Vuex.Store({
  state: {
    categories: null,
    characters: null,
    languages: {},
  },

  mutations: {
    updateCategories(state, categories) {
      this.state.categories = categories;
      console.log(this.state.categories);
    },
    updateKeys(state, characters) {
      // const { results } = characters;// get results into a variable somehow
      this.state.characters = characters;
      // console.log(this.state.characters);
      const rows = [];
      for (let i = 0; i < characters.length + 16; i += 16) {
        const row = [];
        for (let j = i; j < i + 16; j += 1) {
          const td = characters[j];
          if (!td) {
            break;
          }
          td && row.push(td);
        }
        rows.push(row);
      }
      // console.log(rows);
      //  this.state.characters = rows; If this is uncommented it will break
    },
    updateLanguage(state, language) {
      this.state.languages = language;
    },
  },
  getters: {
    characters(state) {
      return state.characters;
    },
    categories(state) {
      return state.categories;
    },
  },
  actions: {
    getCategories({ commit, state }) {
      // axios.get('http://localhost:3333/lookup?q=latin&o=0')
      // axios.get('http://localhost:3333/lookup?q=' + state.language + '')
      // axios.get(`http://localhost:3333/lookup?q=${state.language}`)
      axios.get('http://10.5.9.5:3333/unicode-categories')
        .then(result => commit('updateCategories', result.data))
        .catch(console.error);
    },
    // getCategory({ commit, state }) {
    //   axios.get(`http://10.5.9.5:3333/unicode?category=${state.categories}`)
    //     .then(response => commit('updateCategory', response.data))
    //     .catch(console.error);
    // },
    setLanguage({ dispatch, commit }, selectedLanguage) {
      commit('updateLanguage', selectedLanguage);
      dispatch('getCategories');
      console.log('setLanguage():', selectedLanguage);
    },
  },

});
