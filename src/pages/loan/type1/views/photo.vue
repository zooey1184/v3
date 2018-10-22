<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">贷贷贷</p>
        <v-step :len='5' :active='4'></v-step>
      </div>
      <div class="card_wrap">
        <card title='身份证拍照' v-model='card'>
          <photo slot='contain'></photo>
        </card>
        <button class="btn bg1" @click='$router.push("/zhima")'>下一步</button>
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
  })
}
</script>
