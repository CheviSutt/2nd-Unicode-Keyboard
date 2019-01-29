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
      // console.log('updateKeys():', characters);
      const rows = [];
      let row = [];
      for (const key in characters) {
        const character = characters[key];
        row.push(character);
        if (row.length > 16) {
          rows.push(row);
          row = [];
        }
        // console.log('Rows', rows);
      }
      if (row.length && !rows.length) {
        rows.push(row);
      }
      // console.log('Row', row);
      state.characters = rows;
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
