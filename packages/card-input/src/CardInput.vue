
<template>
  <div class="card-number">
    <input v-model="inputText" ref="input"
           class="placeholder"
           @keyup="backspaceDown($event)"
           @blur="updateText(inputText)"
           :maxlength="type === 1 ? cardNumberLen : bankNumberLen "
           :placeholder="placeholder">
  </div>
</template>

<script>
  export default {
    name: 'cardNumber',
    props: {
      value: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: '填写证件号码'
      },
      type: {
        type: Number,
        default: 1 // 1 身份证 2 银行卡
      }
    },
    data () {
      return {
        // 输入框内容
        inputText: this.value,
        // 光标位置
        caretPos: 0,
        // 是否格式化了数据，用于改变光标位置时的判断
        isFormatted: false,
        // 数据长度是否增加
        isAdd: false,
        // 是否是编辑了数据
        isEdited: false,
        // 银行卡位数
        bankNumberLen: '23',
        // 身份证位数
        cardNumberLen: '21'
      }
    },
    watch: {
      value (newVal) {
        this.inputText = newVal;
      },
      inputText (value, oldValue) {
        this.inputText = this.dataFormart(value)
        let valNoSpace = value.replace(/ /g, '')
        let oldValueNoSpace = oldValue ? oldValue.replace(/ /g, '') : 0
        if (valNoSpace.length > oldValueNoSpace.length) {
          // 数据增加，并且认为没有格式化数据
          this.isFormatted = false
          this.isAdd = true
        } else if (valNoSpace.length < oldValueNoSpace.length) {
          // 数据减少，没有格式化数据
          this.isFormatted = false
          this.isAdd = false
        } else {
          // 如果数据没变化就认为数据被格式化
          this.isFormatted = true
          this.caretPos = this.getCaretPosition(this.$refs.input)
          // 非编辑模式下一旦被格式化光标会往前移动一位，下面的代码用于修复这个小Bug
          if (this.isAdd && !this.isEdited) {
            this.caretPos++
          }
        }
        this.$emit('input', this.inputText)
      }
    },
    mounted () {
      // 拥有数据进行格式化处理
      if (this.inputText) {
        this.updateText(this.inputText)
        setTimeout(() => {
          this.$refs.input.blur();
        }, 0)
      }
    },
    methods: {
      updateText (inputText) {
        // 若值存在 或者没有变化 禁止更新
        if (!inputText || inputText === this.inputText) {
          return;
        }
        if (this.type === 1) {
          let frontSex = inputText.substring(0, 6) + ' '
          let rear = inputText.substring(6).replace(/\s/g, '').replace(/[^\w]/g, '').replace(/(\d{4})(?=\w)/g, '$1 ')
          this.inputText = frontSex + rear
        } else {
          this.inputText = inputText.replace(/(\d{4})/g, '$1 ').trim()
        }
      },
      // 返回银行卡号
      bankValue (newValue) {
        if (newValue.length <= 4) {
          return newValue
        } else if (newValue.length > 4 && newValue.length <= 8) {
          let str1 = newValue.substr(0, 4)
          let str2 = newValue.substr(4)
          return str1 + ' ' + str2
        } else if (newValue.length > 8 && newValue.length <= 12) {
          let str1 = newValue.substr(0, 4)
          let str2 = newValue.substr(4, 4)
          let str3 = newValue.substr(8)
          return str1 + ' ' + str2 + ' ' + str3
        } else if (newValue.length > 12 && newValue.length <= 16) {
          let str1 = newValue.substr(0, 4)
          let str2 = newValue.substr(4, 4)
          let str3 = newValue.substr(8, 4)
          let str4 = newValue.substr(12)
          return str1 + ' ' + str2 + ' ' + str3 + ' ' + str4
        } else if (newValue.length > 16 && newValue.length <= 20) {
          let str1 = newValue.substr(0, 4)
          let str2 = newValue.substr(4, 4)
          let str3 = newValue.substr(8, 4)
          let str4 = newValue.substr(12, 4)
          let str5 = newValue.substr(16)
          return str1 + ' ' + str2 + ' ' + str3 + ' ' + str4 + ' ' + str5
        }
      },

      // 返回身份证号
      cardValue (newValue) {
        if (newValue.length <= 6) {
          return newValue
        } else if (newValue.length > 6 && newValue.length <= 10) {
          let str1 = newValue.substr(0, 6)
          let str2 = newValue.substr(6)
          return str1 + ' ' + str2
        } else if (newValue.length > 10 && newValue.length <= 14) {
          let str1 = newValue.substr(0, 6)
          let str2 = newValue.substr(6, 4)
          let str3 = newValue.substr(10)
          return str1 + ' ' + str2 + ' ' + str3
        } else if (newValue.length > 14) {
          let str1 = newValue.substr(0, 6)
          let str2 = newValue.substr(6, 4)
          let str3 = newValue.substr(10, 4)
          let str4 = newValue.substr(14)
          return str1 + ' ' + str2 + ' ' + str3 + ' ' + str4
        }
      },
      // 更正
      dataFormart (value) {
        let newValue = value.replace(/ /g, '')
        if (this.type === 1) {
          return this.cardValue(newValue).replace(/[^a-zA-Z\s\d]/g, '')
        } else {
          return this.bankValue(newValue).replace(/[^\s\d]/g, '')
        }
      },
      // 光标位置
      getCaretPosition (element) {
        let cursorPos = 0;
        if (document.selection) { // IE
          let selectRange = document.selection.createRange();
          selectRange.moveStart('character', -element.value.length);
          cursorPos = selectRange.text.length;
        } else if (element.selectionStart || element.selectionStart === '0') {
          cursorPos = element.selectionStart;
        }
        return cursorPos;
      },
      // 设定光标位置
      setCaretPosition (textDom, pos) {
        if (textDom.setSelectionRange) {
          // IE Support
          textDom.focus();
          textDom.setSelectionRange(pos, pos);
        } else if (textDom.createTextRange) {
          // Firefox support
          let range = textDom.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      },
      backspaceDown (e) {
        // 获取光标所在位置
        let nowCaretPos = this.getCaretPosition(e.target)
        // 获取光标前的文本，用于判断是否编辑数据
        let frontValue = this.inputText.substr(0, nowCaretPos)
        // 当光标前文本长度与输入框内容长度相等时，认为非编辑模式
        if (frontValue.length === this.inputText.length) {
          this.isEdited = false
        } else {
          this.isEdited = true
        }
        // 如果编辑模式下光标前一位是空格，就删掉它
        if ((this.isEdited) && (frontValue.charAt(frontValue.length - 1) === ' ')) {
          let startText = frontValue.substr(0, frontValue.length - 1)
          let endText = this.inputText.substr(frontValue.length)
          this.inputText = startText + endText
          this.$emit('input', this.inputText)
        }
      }
    },
    updated () {
      // 如果格式化了数据就重新设定光标位置
      this.$nextTick(() => {
        if (this.isFormatted) {
          this.setCaretPosition(this.$refs.input, this.caretPos)
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .card-number{
    width: 100%;
    input{
      width: 100%;
      color: black;
    }
  }
</style>
