<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">贷贷贷</p>
        <v-step :len='5' :active='1'></v-step>
      </div>
      <div class="card_wrap">
        <card title='紧急联系人' v-model='card'>
          <img style='width: 24px;' src="../../assets/b2.png" alt="">
          <contact slot='contain' ref='contact'></contact>
        </card>
        <button class="btn bg1" @click='submitFn'>下一步</button>
      </div>
    </div>
  </page>
</template>

<script>
import contact from '../../contain/contact.vue'
import { mapState } from 'vuex'

export default {
  components: {
    contact,
  },
  data: ()=> ({
    card: true
  }),
  computed: {
    ...mapState({
			form: s => s.loanForm
    }),
    next() {
      if(this.form.contact1 && this.form.contact2 ) {
        return true
      }else {
        return false
      }
    }
  },
  methods: {
    submitFn() {
      let contact = this.$refs.contact
      let callback = ()=> {
        this.$router.push("/zhima")
      }
      contact.onSubmit(callback)
    }
  }
}
</script>
