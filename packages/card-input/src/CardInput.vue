<template>
  <div class="card-input">
    <input v-model="cardNo" ref="ipt" @blur="setCard(cardNo)" @keyup="updateCard(cardNo)" :maxlength="maxlength" :placeholder="placeholder" />
  </div>
</template>

<script>
  export default {
    name: "pCardInput",

    props: {
      value: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      maxlength: {
        type: Number,
        default: 21
      }
    },

    watch: {
      value (newVal) {
        this.cardNo = newVal;
      }
    },

    components: {},

    data() {
      return {
        cardNo: this.value
      }
    },

    mounted() {
    },

    methods: {
      // 追加空格
      updateCard (card) {
        // 获取当前光标的位置
        let caret = this.$refs.ipt.selectionStart;
        // 根据规则记录光标位置
        if (caret === 0 && card.length <= 2) {
          this.cardLen = card.length
          this.cardNo = card = card.replace(/\s*/g, '')
        }
        if ((caret === 6 || caret === 11 || caret === 16) && card[caret - 1] !== '' && card[caret] !== undefined) {
          // 如果删除位置是空格
          if (card[caret] !== ' ') {
            card = card.replace(/\s*/g, '')
            let frontSex = card.substring(0, 6) + ' '
            let rear = card.substring(6).replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
            this.cardNo = frontSex + rear
          }
          this.$refs.ipt.selectionStart = caret
          setTimeout(() => {
            this.$refs.ipt.selectionEnd = caret
          }, 0)
          return;
        }
        // 防止快速输出 正则表达式没生效 长度超出
        if (card.length > 21) {
          this.cardNo = card.substring(0, 21)
          return;
        }
        // 如果输入的长度大于初始值 则记录
        if (!card.length) {
          this.cardLen = 0
        }
        // 如果输入长度大于记录的长度
        if (card.length > this.cardLen) {
          this.cardLen = card.length
        } else {
          // 如果差值大于0
          let difference = this.cardLen - card.length
          if (difference > 0) {
            this.$refs.ipt.selectionStart = caret
            setTimeout(() => {
              this.$refs.ipt.selectionEnd = caret
            }, 0)
          }
        }
        // 如果长度大于6
        if (card.length > 6) {
          card = card.replace(/\s*/g, '')
          let frontSex = card.substring(0, 6) + ' '
          let rear = card.substring(6).replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
          this.cardNo = frontSex + rear
        }
      },

      // 失去焦点再设置一次
      setCard (card) {
        // 防止正则表达式没生效 长度超出
        if (card.length > 21) {
          this.cardNo = card.substring(0, 21)
          return;
        }
        let frontSex = card.substring(0, 6) + ' '
        let rear = card.substring(6).replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
        this.cardNo = frontSex + rear
      }
    }
  }
</script>

<style scoped lang="scss">
  .card-input {
    width: 100%;
    height: 100%;
    input{
      width: 100%;
      height: 100%;
    }
  }
</style>
