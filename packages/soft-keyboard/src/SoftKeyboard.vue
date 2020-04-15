<template>
  <div class="ipt-list" id="softKeyboard">
    <div @click="KeyWordWrap(1)" :class="{'cursor-border' : pressId === 1}" class="ipt-item" ref="ipt1">
      <span>{{text1}}</span></div>
    <div @click="KeyWordWrap(2)" :class="{'cursor-border' : pressId === 2}" class="ml-12 ipt-item" ref="ipt2"><span>{{text2}}</span>
    </div>
    <div @click="KeyWordWrap(3)" :class="{'cursor-border' : pressId === 3}" class="ml-12 ipt-item" ref="ipt3"><span>{{text3}}</span>
    </div>
    <div @click="KeyWordWrap(4)" :class="{'cursor-border' : pressId === 4}" class="ml-12 ipt-item" ref="ipt4"><span>{{text4}}</span>
    </div>
    <div @click="KeyWordWrap(5)" :class="{'cursor-border' : pressId === 5}" class="ml-12 ipt-item" ref="ipt5"><span>{{text5}}</span>
    </div>
    <div @click="KeyWordWrap(6)" :class="{'cursor-border' : pressId === 6}" class="ml-12 ipt-item" ref="ipt6"><span>{{text6}}</span>
    </div>
    <div @click="KeyWordWrap(7)" :class="{'cursor-border' : pressId === 7}" class="ml-12 ipt-item" ref="ipt7"><span>{{text7}}</span>
    </div>
    <div @click="KeyWordWrap(8)" class="ml-12 ipt-item" ref="ipt8"
         :class="{'no-text8': !text8, 'cursor-border' : pressId === 8}"><span>{{text8 ? text8 : '新能源'}}</span>
    </div>
    <div class="keyboard"
         v-if="keyboardStatus">
      <p class="close-keyboard"><a @click="closeKeyboard">完成</a></p>
      <div class="keyboard-vessel">
        <template v-if="showChinese">
          <div class="key-item" v-for="(chinese) in region" :key="chinese" @click="activeChinese(chinese)">
            <span>{{chinese}}</span>
          </div>
        </template>
        <template v-if="showCombination">
          <div class="key-item" v-for="(val) in combination" :key="val.text" @click="activeCombination(val)"
               :class="{'no-click': !val.clickStatus}">
            <span>{{val.text}}</span>
          </div>
        </template>
        <div class="del-bt del-chinese" @click="delVal"><img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAkCAYAAADPRbkKAAADjUlEQVRYR9WZz2sTURDHv283ta30oHhR60FFkAqKUpOYNJEqnqyNtRJ7UIsIVsEfiHrxZPsHqAh6FKU9Cv2R+Lu0Lsna0o1FUehBUOhBBauFag+2yWZkm43YdJN92V3buLfAzHvfz5t5M7sThv/8YXb0+3zhStU1cw7AMQA1AMrsrGfgqwKYADBCDJ2JWKQ718YyQG2weY2I1FMA2xwWXWi5QVWkllEp+i1rZAlAF/8CwOZFFD+3FQPe/RTL/WPSg2n9d3ESDMR/EYidrnBN9UuS9Ku41cys2wW//82GlItOgegKAFHzIMKdhBzRUlcD4n9yxRPwmZG4R5F73vOvYs3SG2g6TizdqXsnk0hWv44/meAGWErxWWRvMCQTUDd38kStI3K0iwugFMRroj2BUDsYrumXoUOJRdpNAUpFvA5wCQzX9YjcUOKRywUBrIp3Bxo2apsk5EcfeTO+trZxeVmlsLXCNTUqSVLKyM8TCPEDWBXv2d24F8Sea8UCjM4osehdM4jMXuoAQDVgrEeJ9TXbArAqXtvUHThwgTHhll7u0kygtkIQC8oy4YMiRzZZBrAjXtt0S324qkqdGdRYzCAMxM8CdFiRow8tAdgVn910e33TimVqWkujvBA76kJrywRooJluTpgFE1qUeG9vvpQreAecEs8DYUV8wSrkrt+/mqkuKXsaTnVYw0gwXAVwspiTzx5K3gh4g6F+AvZlDGkS5PI59XqQCzEvPQizjIlHRuI9fWaVKm8E9HB++rMAoV2RIx08C/LazEGk0/0g7PzLJ8kghnnFLymA0es3EUxLbO4BLUkKFfp2KBYiL8C/usSGdV5AGwhnefoEdwQ0Q6fLqKF4vc7z9IklbWSFxPP0CUuNLOtkNxIez6FVKFdf8tR5o0gIEE6MyL1dliLgBIQ32HiRwG7yvh4s6BNE44ocXW8LwM6d2BU46E0z0iYWBAhHC73bzEunND0GkY9A9xLxqNapFzxFfQ/YgQgEGlaqaooNDz+b5G12QFj0+9V1Q0Pd47buQK6z3TvBD2BuWXQEnLgT5rL4LSx91JcShDsYkpk+VkkTtb7iHauUAoQ3GDpGQKa8EmZVF1VrM1LTsYrZnQCw6KNFALeVeOS8pq1oAKPqxJ/Fjli+nRZ/1I1JkrXhbk46LfJ4nQ1gRmhRlJ7vWR2WIpB1Xpw/ONhXgBRAuG/UFG0BOJIQNhf5DVW04kOU6IZBAAAAAElFTkSuQmCC"/>
        </div>
      </div>
    </div>
  </div>
</template>
<!--输入组-->
<script>
  export default {
    name: 'pSoftKeyboard',
    components: {},
    props: {
      value: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        textVal: '',
        text1: '',
        text2: '',
        text3: '',
        text4: '',
        text5: '',
        text6: '',
        text7: '',
        text8: '',
        pressId: '',
        keyboardStatus: false,
        showCombination: false,
        showChinese: false,
        region: [
          '鄂', '京', '津', '湘', '沪',
          '粤', '渝', '琼', '翼', '川',
          '晋', '贵', '辽', '云', '吉',
          '陕', '黑', '甘', '苏', '青',
          '浙', '皖', '藏', '闽', '蒙',
          '赣', '桂', '鲁', '宁', '豫',
          '新', '使', '港', '澳', '台'
        ],
        combination: [
          {
            type: 'N',
            clickStatus: true,
            text: '1'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '2'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '3'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '4'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '5'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '6'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '7'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '8'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '9'
          },
          {
            type: 'N',
            clickStatus: true,
            text: '0'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'Q'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'W'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'E'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'R'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'T'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'Y'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'U'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'P'
          },
          {
            type: 'C',
            clickStatus: true,
            text: '港'
          },
          {
            type: 'C',
            clickStatus: true,
            text: '澳'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'A'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'S'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'D'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'F'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'G'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'H'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'J'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'K'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'L'
          },
          {
            type: 'C',
            clickStatus: true,
            text: '学'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'Z'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'X'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'C'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'V'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'B'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'N'
          },
          {
            type: 'E',
            clickStatus: true,
            text: 'M'
          },
          {
            type: 'C',
            clickStatus: true,
            text: '领'
          },
          {
            type: 'C',
            clickStatus: true,
            text: '警'
          }
        ]
      }
    },
    mounted () {
    },
    watch: {
      value (v) {
        if (v) {
          for (let i = 0; i < v.length; i++) {
            if (v[i] === ' ') {
              this['text' + (i + 1)] = ''
            } else {
              this['text' + (i + 1)] = v[i]
            }
          }
        }
        this.textVal = v
      },
      pressId (id) {
        if (id === 1) {
          this.showChinese = true
          this.showCombination = false
        } else {
          if (id === 9) {
            this.closeKeyboard()
          }
          this.showChinese = false
          this.showCombination = true
          if (id === 2) { // 只能点击字母
            this.combination.map(item => {
              item.clickStatus = true
              if (item.type !== 'E') {
                item.clickStatus = false
              }
            })
          } else if (id === 7) { // 只能点击字母和中文
            this.combination.map(item => {
              item.clickStatus = true
            })
          } else { // 只能点击字母和数字
            this.combination.map(item => {
              item.clickStatus = true
              if (item.type === 'C') {
                item.clickStatus = false
              }
            })
          }
        }
      }
    },
    methods: {
      // 关闭键盘
      closeKeyboard () {
        this.keyboardStatus = false
        this.showChinese = false
        this.showCombination = false
        this.pressId = ''
        this.removeCursor()
        let val = ''
        for (let i = 1; i <= 8; i++) {
          if (this['text' + i]) {
            val += this['text' + i]
          } else {
            val += ' '
          }
        }
        this.$emit('input', val)
      },

      // 删除
      delVal () {
        this.removeCursor()
        if (!this['text' + this.pressId] && this.pressId > 1) {
          this.pressId--
          this['text' + this.pressId] = ''
          this.addCursor(this.pressId)
        } else {
          this['text' + this.pressId] = ''
          this.addCursor(this.pressId)
        }
      },

      // 选择的简称
      activeChinese (val) {
        this['text' + this.pressId] = val
        this.removeCursor()
        this.addCursor(++this.pressId)
      },

      /**
       * @param data 数字/英文/中文
       */
      activeCombination (data) {
        if (data.clickStatus) {
          this['text' + this.pressId] = data.text
          this.removeCursor()
          this.addCursor(++this.pressId)
        }
      },

      /**
       * @param pressId id编号
       */
      KeyWordWrap (pressId) {
        let click = true
        let left = this.textVal.slice(0, pressId)
        let right = this.textVal.slice(pressId, this.textVal.length - 1)
        if (!left.length && !right.length) {
          click = false
        }
        if (pressId === 1 && !this['text' + pressId]) {
          click = true
        }
        if (pressId !== this.pressId && click) {
          this.keyboardStatus = true
          this.removeCursor()
          this.pressId = pressId
          this.addCursor(pressId)
        }
      },
      // 删除光标
      removeCursor () {
        let iptCursor = document.getElementById('iptCursor')
        if (iptCursor) {
          iptCursor.remove()
        }
      },
      // 添加光标
      addCursor (type) {
        let iptCursor = document.createElement('div');
        iptCursor.id = 'iptCursor'
        if (this['text' + type]) {
          iptCursor.className = 'have-text-ipt-cursor'
        }
        if (this.$refs['ipt' + type]) {
          this.$refs['ipt' + type].appendChild(iptCursor)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .ipt-list {
    display: flex;
    align-items: center;
    justify-content: center;
    .ml-12 {
      margin-left: 12px;
    }
    .ipt-item {
      position: relative;
      display: inline-block;
      font-size: 20px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: normal;
      width: 8.815%;
      height: 36px;
      border: 1px solid rgba(239, 239, 240, 1);
      text-align: center;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      &::placeholder {
        font-size: 9px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(167, 174, 188, 1);
        line-height: 30px;
      }
    }
    .cursor-border {
      border: 1px solid rgba(74, 129, 238, 1);
    }
    .no-text8 {
      span {
        font-size: 9px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(167, 174, 188, 1);
        line-height: 13px;
      }
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #363D4E;
      display: inline-block;
    }
    .keyboard {
      background-color: #E4E5ED;
      padding: 4px 6px 8px;
      position: fixed;
      z-index: 999;
      bottom: 0;
      left: 0;
      right: 0;
      .close-keyboard {
        margin: 0;
        display: flex;
        justify-content: flex-end;
        padding: 6px 16px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(74, 129, 238, 1);
        line-height: 22px;

      }
      .keyboard-vessel {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .key-item {
          margin: 0 2px 10px;
          box-sizing: border-box;
          width: 8.8215%;
          height: 42px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 1px 2px 0 rgba(197, 198, 198, 0.42);
          border-radius: 4px;
          text-align: center;
          overflow: hidden;
          position: relative;
          transition: background-color .1s linear, border .1s linear;
          &:after {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            background-image: radial-gradient(circle, #000 10%, rgba(0, 0, 0, 0) 10.01%);
            background-repeat: no-repeat;
            background-position: 50%;
            transform: scale(10);
            opacity: 0;
            transition: transform .3s, opacity .5s;
          }
          &:active:after {
            transform: scale(0);
            opacity: .2;
            transition: 0s;
          }
          &.bordernone {
            border: none;
            box-shadow: none
          }
          span {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
            height: 100%;
            background-color: #fff;
            color: #363D4E;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(54, 61, 78, 1);
            line-height: normal;
          }
        }
        .no-click {
          span {
            color: #A7AEBC;
          }
        }
        .del-bt {
          width: 8.8215%;
          height: 42px;
          background: rgba(167, 174, 188, 1);
          box-shadow: 0 1px 2px 0 rgba(197, 198, 198, 0.42);
          border-radius: 5px;
          opacity: 0.6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 2px;
          img {
            width: 24px;
            height: 18px;
          }
        }
        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
      }
    }
  }

  > > > #iptCursor {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: 1s cursor-flicker infinite;
    width: 1px;
    height: 40%;
    border-radius: 1px;
    background: #4A81EE;
  }

  > > > .have-text-ipt-cursor {
    width: 100% !important;
    height: 100% !important;
    background: white !important;
  }

  @-webkit-keyframes cursor-flicker {
    from {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes cursor-flicker {
    from {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
