<template>
  <div style='padding: 20px;'>
    <card v-model='card'>
      <div slot='contain'>
        <button @click='test'>test</button>
      </div>
    </card>
    <model-pane v-model='showPane'>
      <div>
        <code-btn></code-btn>
      </div>
    </model-pane>
  </div>
</template>


<script>
import codeBtn from '../../contain/yysBtn.vue'

export default {
  data: ()=> ({
    showPane: false,
    card: true
  }),
  components: {
    codeBtn
  },
  methods: {
    test() {
      // this.showPane = !this.showPane
      this.$mark.show({
        msg: '',
        btn: [],
        tpl: codeBtn
      })
    }
  }
}
</script>