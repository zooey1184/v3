<template>
  <page :state='pageState'>
    <div>
      <div class="top_page bg1">
        <v-step></v-step>
      </div>
      <div class="wrap_3d">
        <div class="sm_pane sm_top1" :style='sty_1'>
          <h4 class="sm_title bg1">
            <img src="../../assets/b1.png" alt="">
            基本信息
          </h4>
          <button @click='foldFn(1)'>back</button>
          <button @click='foldFn(2)'>go</button>
        </div>
        <div class="sm_pane sm_top2" :style='sty_2'>
          <h4 class="sm_title bg1">
            <img src="../../assets/b2.png" alt="">
            紧急联系人
          </h4>
          <button @click='foldFn(2)'>back</button>
          <button @click='foldFn(3)'>go</button>
        </div>
        <div class="sm_pane sm_top3" :style='sty_3'>
          <h4 class="sm_title bg1">
            <img src="../../assets/b3.png" alt="">
            芝麻认证
          </h4>
          <button @click='foldFn(3)'>back</button>
          <button @click='foldFn(4)'>go</button>
          <button @click='foldFn(2)'>bbbbb</button>
        </div>
        <div class="sm_pane sm_top4" :style='sty_4'>
          <h4 class="sm_title bg1">
            <img src="../../assets/b4.png" alt="">
            运营商认证
          </h4>
          <button @click='foldFn(4)'>back</button>
          <button @click='foldFn(5)'>go</button>
        </div>
        <div class="sm_pane sm_top5" :style='sty_5'>
          <h4 class="sm_title bg1">
            <img src="../../assets/b5.png" alt="">
            身份认证
          </h4>
          <button @click='foldFn(5)'>back</button>
          <button @click='foldFn(1)'>go</button>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import formItem from '@/components/formList/formItem.vue'

export default {
  components: {
    formItem
  },
  data: ()=> ({
    pageState: 'loading',
    active: 1,
    middleChange: null, // 中间层 判断是否首次使用fold
    sty_1: {},
    sty_2: {},
    sty_3: {},
    sty_4: {},
    sty_5: {}
  }),
  methods: {
    autoPre(name) {
      let arr = ['-moz-', '-webkit-', '-o-', '-ms-']
      let val = name
      let styleHtml = document.documentElement.style
      if(name in styleHtml) {
        return name
      }else {
        for(let i=0; i<arr.length; i++) {
          if(`${arr[i]}${name}` in styleHtml) {
            val = `${arr[i]}${name}`
            return val
          }
        }
      }
    },
    foldFn(active) {
      let transform = this.autoPre('transform')
      let act = active
      let obj = {
        top: 0,
        opacity: 1,
        zIndex: 2
      }
      for(let i=1; i<6; i++) {
        if(i<act-1) {
          this[`sty_${i}`] = {}
        }
        if(i==act-1) {
          if(this.middleChange && this.middleChange<=act-1) {
            this[`sty_${i}`] = {
              [transform]: 'rotateX(0) scale(0.8)',
              'zIndex': 2
            }
            setTimeout(()=> {
              this[`sty_${i}`] = {
                [transform]: 'rotateX(-75deg) scale(0.8)'
              }
            }, 450)
          }else {
            this[`sty_${i}`] = {}
          }
        }
        if(i==act) {
          if(this.middleChange) {
            setTimeout(()=> {
              this[`sty_${i}`] = {
                [transform]: 'rotateX(0) scale(0.8)',
                ...obj
              }
              setTimeout(()=> {
                this[`sty_${i}`] = {
                  [transform]: 'rotateX(0) scale(1)',
                  ...obj
                }
              }, 500)
            }, 460)
          }else {
            this[`sty_${i}`] = {
              [transform]: 'rotateX(0) scale(0.8)',
              ...obj
            }
            setTimeout(()=> {
              this[`sty_${i}`] = {
                [transform]: 'rotateX(0) scale(1)',
                ...obj
              }
            }, 500)
          }
        }
        if(i>active) {
          this[`sty_${i}`] = {
            [transform]: 'rotateX(-75deg) scale(0.8) translateY(1700px)',
          }
        }
      }
      setTimeout(()=> {
        this.middleChange = active
      }, 10)
    },
  },
  mounted() {
    setTimeout(()=> {
      this.pageState = 'success'
    }, 550)
  }
}
</script>

<style lang="less">
.wrap_3d {
  perspective: 1500px;
  position: absolute;
  width: 100%;
  height: 100%;
}
.sm_pane {
  width: 100%;
  position: absolute;
  height: 100%;
  background: #fff;
  opacity: .8;
  color: #fff;
  transform: rotateX(-75deg) scale(0.8);
  transform-style: preserve-3d;
  transition: all 450ms linear;
  top: 0;
  .sm_title {
    height: 48px;
    padding: 10px;
    font-size: 16px;
    font-weight: lighter;
    display: flex;
    align-items: center;
    img {
      width: 22px;
      margin-right: 10px;
    }
  }
}
.sm_top1 {
  top: 0;
}
.sm_top2 {
  top: 40px;
}
.sm_top3 {
  top: 80px;
}
.sm_top4 {
  top: 120px;
}
.sm_top5 {
  top: 160px;
}

</style>
