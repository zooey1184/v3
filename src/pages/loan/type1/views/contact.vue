<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">hei</p>
        <v-step :len='5' :active='1'></v-step>
      </div>
      <div class="card_wrap">
        <card title='紧急联系人' v-model='card'>
          <form-list slot='contain' :width='80'>
            <p>紧急联系人1</p>
            <ceil title='姓名'>
              <input type="text" placeholder="请填写联系人1姓名">
            </ceil>
            <ceil title='联系人电话'>
              <input type="text" placeholder="请填写联系人1电话">
            </ceil>
            <p>紧急联系人2</p>
            <ceil title='姓名'>
              <input type="text" placeholder="请填写联系人2姓名">
            </ceil>
            <ceil title='联系人电话'>
              <input type="text" placeholder="请填写联系人2电话">
            </ceil>
          </form-list>
        </card>
        <button class="btn bg1" @click='$router.push("/zhima")'>下一步</button>
      </div>
    </div>
  </page>
</template>

<script>
import formList from '@/components/formList/formList.vue'
import ceil from '@/components/formList/ceil.vue'

export default {
  components: {
    formList,
    ceil
  },
  data: ()=> ({
    card: true
  })
}
</script>
