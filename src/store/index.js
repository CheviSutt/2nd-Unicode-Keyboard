import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// export const store = new Vuex.Store({
export default new Vuex.Store({
  state: {
    characters: [],
    languages: {},
  },

  mutations: {
    updateKeys(state, characters) {
      const { results } = characters;// get results into a variable somehow
      const rows = [];
      for (let i = 0; i < results.length + 16; i += 16) {
        const row = [];
        for (let j = i; j < i + 16; j += 1) {
          const td = results[j];
          if (!td) {
            break;
          }
          td && row.push(td);
        }
        rows.push(row);
      }
      // console.log(rows);
      this.state.characters = rows;
    },
    updateLanguage(state, language) {
      this.state.languages = language;
    },
  },
  getters: {
    characters(state) {
      return state.characters;
    },
  },
  actions: {
    getUnicode({ commit, state }) {
      // axios.get('http://localhost:3333/lookup?q=latin&o=0')
      // axios.get('http://localhost:3333/lookup?q=' + state.language + '')
      // axios.get(`http://localhost:3333/lookup?q=${state.language}`)
      axios.get('http://10.6.15.202:3333/unicode-categories')
        .then(result => commit('updateKeys', result.data))
        .catch(console.error);
    },
    setLanguage({ dispatch, commit }, selectedLanguage) {
      commit('updateLanguage', selectedLanguage);
      dispatch('getUnicode');
    },
  },

});
