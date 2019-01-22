<template>
  <div class="container">

    <h1>{{ title }}</h1>
    <h2>{{ categories }}</h2>

    <div class="keyboard">
      <select @change="setLanguage(currLanguage)" v-model="currLanguage">
        <option value="" selected>Select Language</option>
        <option value="Other, Control">Other, Control</option>
        <option value="Other, Format">Other, Format</option>
        <option value="Other, Private Use">Other, Private Use</option>
        <option value="Other, Surrogate">Other, Surrogate</option>
        <option value="Letter, Lowercase">Letter, Lowercase</option>
        <option value="Letter, Modifier">Letter, Modifier</option>
        <option value="Letter, Other">Letter, Other</option>
        <option value="Letter, Titlecase">Letter, Titlecase</option>
        <option value="Letter, Uppercase">Letter, Uppercase</option>
        <option value="Mark, Spacing Combining">Mark, Spacing Combining</option>
        <option value="Mark, Enclosing">Mark, Enclosing</option>
        <option value="Mark, Nonspacing">Mark, Nonspacing</option>
        <option value="Number, Decimal Digit">Number, Decimal Digit</option>
        <option value="Number, Letter">Number, Letter</option>
        <option value="Number, Other">Number, Other</option>
        <option value="Punctuation, Connector">Punctuation, Connector</option>
        <option value="Punctuation, Dash">Punctuation, Dash</option>
        <option value="Punctuation, Close">Punctuation, Close</option>
        <option value="Punctuation, Final quote">Punctuation, Final quote</option>
        <option value="Punctuation, Initial quote">Punctuation, Initial quote</option>
        <option value="Punctuation, Other">Punctuation, Other</option>
        <option value="Punctuation, Open">Punctuation, Open</option>
        <option value="Symbol, Currency">Symbol, Currency</option>
        <option value="Symbol, Modifier">Symbol, Modifier</option>
        <option value="Symbol, Math">Symbol, Math</option>
        <option value="Symbol, Other">Symbol, Other</option>
        <option value="Separator, Line">Separator, Line</option>
        <option value="Separator, Paragraph">Separator, Paragraph</option>
        <option value="Separator, Space">Separator, Space</option>
      </select>
        <div class="keyTable">
          <table>
            <tr v-for="(row, index) of characters" :key="index">
              <td v-bind:class="{ active: activeKey(key) }" v-for="key of row" :title="key[5]"
                  :key="key[3]" @click="recentSymbols(key)">
                <div class="keyButton">{{ key[4] }}</div></td>
            </tr>
          </table>
      </div>
      <h4>Recently used symbols:</h4>
      <div class="recentRow">
        <table>
          <tr>
            <td v-for="symbol of symbols" :key="symbol[0]" :title="symbol[5]">
              <div class="keyButton">{{ symbol[4] }}</div></td>
          </tr>
        </table>
      </div>
      <div class="buttons">
        <button>Insert</button>
        <button>Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UnicodeTable',
  data() {
    return {
      title: 'Unicode Keyboard',
      currLanguage: '',
      symbols: [],
      active: false,
    };
  },
  computed: {
    ...mapGetters({
      characters: 'characters',
      categories: 'categories',
    }),
  },
  methods: {
    ...mapActions([
      'getCategories',
      'getCategory',
      'setLanguage',
    ]),

    recentSymbols(key) {
      this.clickedKey = key;
      let prevSelected = false;
      for (let i = 0; i < this.symbols.length; i += 1) {
        if (this.symbols[i] === key) {
          prevSelected = true;
        }
      }
      if (!prevSelected) {
        this.symbols.unshift(key);
        localStorage.setItem('characterSelected', JSON.stringify(this.symbols));
        this.symbols = this.symbols.slice(0, 15);
        console.log(this.symbols[0]);
      }
      this.$emit('keySelected', key);
    },

    activeKey(key) {
      // console.log(this.clickedKey, key);
      if (this.clickedKey === key) {
        return true;
      }
    },

  },

  created() {
    this.getCategories();
    this.getCategory();
    this.symbols = JSON.parse(localStorage.getItem('characterSelected')) || []; // clears length of null error when storage is clear
  },

};
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100em;
    border: 1px solid black;
    flex-shrink: 0;
  }
  .keyboard select {
    width: 60rem;
    margin: .5rem;
    cursor: pointer;
  }
  .keyTable {
    display: flex;
    margin-bottom: .5rem;
    cursor: pointer;
  }
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th, td {
    /*padding: 5px;*/
    /*width: 1rem;*/
    /*height: 1rem;*/
  }
  td:hover {
    background-image: linear-gradient(to bottom,
    #7db9e8 11%,#7db9e8 11%,#7db9e8 17%,#2989d8 43%,#207cca 68%,#1e5799 97%,#1e5799 97%);
    color: white;
  }
  .active {
    background-color: lawngreen;
  }
  .keyButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 4px;
  }
  h4 {
    display: flex;
    margin: 0;
  }
  .recentRow {
    margin-bottom: .5rem;
    cursor: pointer;
  }
  .buttons button {
    cursor: pointer;
    background-color: dodgerblue;
  }
</style>
