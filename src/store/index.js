import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// export const store = new Vuex.Store({
export default new Vuex.Store({
  state: {
    categories: null,
    category: null,
    characters: null,
    // character: null, // not used
    languages: {},
  },

  mutations: {
    updateCategories(state, categories) {
      state.categories = categories;
      state.category = 'Cc';
      // console.log(this.state.categories);
    },
    updateKeys(state, characters) {
      state.characters = characters;
      console.log('updateKeys():', characters);
      const rows = [];
      for (let i = 0; i < characters + 16; i += 16) { // results.length instead of characters
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
      // this.characters = rows; // If this is uncommented it will break
    },
    updateLanguage(state, language) {
      this.state.category = language;
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
    getCategories({ commit }) {
      return axios.get('http://10.6.9.21:3333/unicode-categories')
        .then(result => commit('updateCategories', result.data))
        .catch(console.error);
    },
    getCategory({ commit, state }) {
      return axios.get(`http://10.6.9.21:3333/unicode?category=${state.category}`)
        .then(response => commit('updateKeys', response.data))
        .catch(console.error);
    },
    setLanguage({ dispatch, commit }, selectedLanguage) {
      commit('updateLanguage', selectedLanguage);
      return dispatch('getCategory');
    },
  },

});
