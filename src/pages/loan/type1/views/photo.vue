<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">贷贷贷</p>
        <v-step :len='5' :active='4'></v-step>
      </div>
      <div class="card_wrap">
        <card title='身份证拍照' v-model='card'>
          <photo slot='contain' ref='photo'></photo>
        </card>
        <button class="btn bg1" @click='submitFn'>下一步</button>
      </div>
    </div>
  </page>
</template>

<script>
import photo from '../../contain/photo.vue'

export default {
  components: {
    photo,
  },
  data: ()=> ({
    card: true
  }),
  methods: {
    submitFn() {
      let photo = this.$refs.photo
      let callback = ()=> {
        this.$router.push("/zhima")
      }
      photo.onSubmit(callback)
    }
  }
}
</script>
