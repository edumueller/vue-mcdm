<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      ahpContext: {}
    }
  },
  methods: {
    init() {
      const AHP = require('ahp');
      this.ahpContext = new AHP();

      this.ahpContext.addItems(['VendorA', 'VendorB', 'VendorC']);
      this.ahpContext.addCriteria(['price', 'functionality', 'UX']);

      //rank criteria with rank scale
      this.ahpContext.rankCriteriaItem('price', [
        ['VendorB', 'VendorC', 1 / 2],
        ['VendorA', 'VendorC', 1 / 2],
        ['VendorA', 'VendorB', 1]
      ]);

      //rank criteria with rank scale
      this.ahpContext.rankCriteriaItem('functionality', [
        ['VendorB', 'VendorC', 1],
        ['VendorA', 'VendorC', 5],
        ['VendorA', 'VendorB', 5]
      ]);

      //rank criteria with absolute rank scole
      this.ahpContext.setCriteriaItemRankByGivenScores('UX', [10, 10, 1]);

      this.ahpContext.rankCriteria(
              [
                ['price', 'functionality', 3],
                ['price', 'UX', 3],
                ['functionality', 'UX', 1]
              ]
      );

      let output = this.ahpContext.run();
      console.log(output);
    }
  },
  created: function () {
    this.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
