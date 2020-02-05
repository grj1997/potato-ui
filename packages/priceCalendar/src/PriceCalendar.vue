<template>
    <div class="price-calendar" @touchmove.prevent>
        <div class="calendar-mask" v-show="visible" @touchmove.prevent @click.stop="close">
            <div class="calendar-content" @click.stop>
                <div class="calendar-content-title">
                    {{title}}
                </div>
                <div class="content-title">
                    <span>日</span>
                    <span>一</span>
                    <span>二</span>
                    <span>三</span>
                    <span>四</span>
                    <span>五</span>
                    <span>六</span>
                </div>
                <div class="content-all" @touchmove.stop>
                    <div class="content-month" v-for="(month, mIndex) in monthList" :key="mIndex">
                        <div class="date-top">{{month.dateTop}}</div>
                        <div class="content">
                            <div class="content-item" v-for="(item, index) in month.one"
                                 :key="index"
                                 @click="clickDay(item, index, mIndex, item.onClick)">
                                <div class="content-item-div"
                                     :class="{ isToday: item.isToday, 'no-Click': !item.onClick}">
                                    <span>{{item.id}}</span>
                                    <div v-if="item.onClick"></div>
                                    <div v-else>{{item.date ? noClickText ? noClickText : '' : '' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <slot>
                    <div class="affirm button">
                        <button class="submit-btn" @click="selectDate">确认</button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
  /**
   * @author gaorongjun@gogpay.cn
   * @date 2020-2-4
   * 该控件 显示1年的日期
   * 可以根据后台传入的可选择时间显示能否点中
   * 支持只有工作日能点击
   * 支持隐藏当天前的日期（当月）
   * 确认按钮支持slot
   */
  export default {
    name: 'pPriceCalendar',

    props: {
      // 头部标题
      title: {
        type: String,
        default: '请选择日期'
      },
      // 是否显示
      value: {
        type: Boolean,
        default: false
      },
      markArray: {
        type: Array,
        default: () => []
      },
      // 隐藏过去的日期
      hideDidst: {
        type: Boolean,
        default: false
      },
      // 周末是否可以点击
      weekendClick: {
        type: Boolean,
        default: true
      },
      // 可以选择的日期 格式 '2020/02/02'
      onClickDateList: {
        type: Array,
        default: () => []
      },
      // 不可点击文案
      noClickText: {
        default: '不可订'
      }
    },
    data () {
      return {
        list: [],
        dateTop: '',
        myDate: new Date(),
        // 选择的时间
        selectUseDate: {},
        // 每个月的数据
        monthList: []
      }
    },

    watch: {

      visible () {
        if (this.visible === false) {
          this.$emit('close');
        }
      }
    },

    computed: {
      visible () {
        return this.value;
      }
    },

    mounted () {
      this.getList()
      let m = new Date(this.myDate).getMonth() + 1
      for (let i = m; i < (m + 12); i++) {
        this.nextMonth()
      }
    },

    methods: {
      /**
       * 点击确定
       *  date [String] 日期
       *  weekN [Number] 阿拉伯数字周几
       *  weekC [String] 中文周几
       *  isToday [Boolean] 是否是今天
       *  dateC [String] 中文日期
       */
      selectDate () {
        this.close();
        this.$emit('select', this.selectUseDate)
      },
      /**
       * 关闭日历
       */
      close () {
        this.$emit('close');
      },

      /**
       * 选择日期
       * item, index, mIndex, onClick
       * 当前月  当前日期索引  当前月索引  是否可以点击
       * */
      clickDay (item, index, mIndex, onClick) {
        if (item.id && onClick) {
          this.selectUseDate = {
            date: item.date,
            weekN: item.weekN,
            weekC: item.weekC,
            isToday: item.isToday,
            dateC: item.dateC,
            price: item.price
          };
          this.monthList.map((monthItem) => {
            monthItem.one.map((cItem) => {
              cItem.isToday = cItem.date === item.date;
              return cItem;
            })
          })
        }
      },

      /**
       *  获取上个月
       */
      preMonth () {
        this.myDate = this.getPreMonth(this.myDate);
        this.$emit('changeMonth', this.dataFormat(this.myDate));
        this.getList()
      },

      /**
       *  获取下个月
       */
      nextMonth () {
        this.myDate = this.getNextMonth(this.myDate);
        this.$emit('changeMonth', this.dataFormat(this.myDate));
        this.getList()
      },

      /**
       * 获取上一个月数据
       * @param date
       * @returns {Date}
       */
      getPreMonth (date) {
        let arr = this.dataFormat(date).split('/');
        let [year, month] = arr;
        let newDate = new Date(year, parseInt(month) - 1, 0);
        return new Date(newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate());
      },

      /**
       * 获取下一个月数据
       * @param date
       * @returns {Date}
       */
      getNextMonth (date) {
        let arr = this.dataFormat(date).split('/');
        let [year, month] = arr;
        let newDate = new Date(year, parseInt(month) + 1, 0);
        return new Date(newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate());
      },

      /**
       * 初始化显示的数据
       */
      getList () {
        let myDate = this.myDate;
        let mygetMonth = (myDate.getMonth() + 1).toString().replace(/^([0-9]{1})$/, '0$1');
        // 头部显示日期
        let dateTop = myDate.getFullYear() + '年' + mygetMonth + '月';
        let array = [];
        for (let index = 1, dates = this.getDaysInOneMonth(myDate); index <= dates; index++) {
          // onClick false则展示 true则不展示
          let m = myDate.getMonth() + 1
          let obj = {
            id: index,
            date: myDate.getFullYear() + '/' + (m < 10 ? '0' + m : m) + '/' + (index < 10 ? '0' + index : index),
            onClick: true
          };
          if (this.dataFormat(new Date()) === this.dataFormat(new Date(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + index))) {
            // 当天isToday = true
            obj.isToday = true;
            array = array.concat(obj);
            obj = this.getWeek(obj, index + 1) // 返回周几的日期索引是从0开始 所以减一
            this.selectUseDate = {
              date: obj.date,
              weekN: obj.weekN,
              weekC: obj.weekC,
              isToday: obj.isToday,
              dateC: obj.dateC
            };
            console.log(obj)
            this.$emit('isToday', this.dataFormat(new Date(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + index)))
          } else {
            if (new Date().getTime() > new Date(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + index).getTime()) {
              obj.didst = true; // 今天以前的时间
            }
            // 否则为false
            obj.isToday = false;
            array = array.concat(obj);
          }
        }
        // 为每月前后添加空日期
        let array2 = [];
        for (let i = 0, weeks = this.getMonthWeek(myDate); i < weeks; i++) {
          array2 = array2.concat({has_date: false})
        }
        if (array2.length === 7) {
          array2 = []
        }
        let hideDidstList = []
        let _array = JSON.parse(JSON.stringify({list: array})).list
        if (this.hideDidst) { // 隐藏过去的日期
          _array.map((item) => {
            if (item.didst === true) {
              array.splice(item, 1)
              hideDidstList.push(item)
            }
          })
          for (let i = 0; i < (hideDidstList.length % 7); i++) {
            array2 = array2.concat({has_date: false})
          }
          if (hideDidstList.length) { // 如果占位的空格超过一排 则去除第一排空dom
            array2 = array2.slice(0, (hideDidstList.length - 1))
          }
        }
        this.list = [...array2, ...array]
        // 返回周几
        this.list.map((item, index) => {
          return this.getWeek(item, index)
        })
        this.monthList.push({one: this.list, dateTop: dateTop})
      },

      /**
       * 根据日期对象 返回周几拼装到日期对象
       * item [Object] 日期
       * index [Number] 日期的索引
       * @returns {Object} 日期  + 周几 + dateC [String] 中文日期
       */
      getWeek (item) {
        let _item
        let week = '星期'
        let dateC = ''
        if (item.date) {
          item.price = item.date ? 30 : ''
          let date = item.date.split('/')
          let _date = new Date(date[0], parseInt(date[1] - 1), date[2]); // 转换为日期对象
          if ((_date.getDay() === 0 || _date.getDay() === 6) && !this.weekendClick) {
            item.onClick = false
          }
          if (this.onClickDateList.length) { // 后台给的可以点击的时间
            item.onClick = false
            item.isToday = false
            this.onClickDateList.map(clickDate => {
              if (item.date === clickDate.date) {
                item.onClick = true
              }
            }) // isToday
            if (this.onClickDateList[0].date === item.date) { // 能点击的时间中 第一个时间默认选中
              item.isToday = true
            }
          }
          let y = date[0] + '年'
          let m = date[1] + '月'
          let d = date[2] + '日'
          dateC = y + m + d
          /**
           * weekN [Number] 周几阿拉伯数字
           * weekC [String] 周几中文
           * dateC [String] 中文日期
           */
          switch (_date.getDay()) {
            // 第几天
            case 0:
              _item = Object.assign(item, { weekN: 7, weekC: week + '日', dateC })
              break;
            case 1:
              _item = Object.assign(item, { weekN: 1, weekC: week + '一', dateC })
              break;
            case 2:
              _item = Object.assign(item, { weekN: 2, weekC: week + '二', dateC })
              break;
            case 3:
              _item = Object.assign(item, { weekN: 3, weekC: week + '三', dateC })
              break;
            case 4:
              _item = Object.assign(item, { weekN: 4, weekC: week + '四', dateC })
              break;
            case 5:
              _item = Object.assign(item, { weekN: 5, weekC: week + '五', dateC })
              break;
            case 6:
              _item = Object.assign(item, { weekN: 6, weekC: week + '六', dateC })
              break;
          }
          return _item
        }
      },

      /**
       * 根据日期获取当月天数
       * @param myDate
       * @returns {number}
       */
      getDaysInOneMonth (myDate) {
        return new Date(myDate.getFullYear(), myDate.getMonth() + 1, 0).getDate();
      },

      /**
       * 格式化日期 YYYY/mm/dd
       * @param myDate
       * @returns {string}
       */
      dataFormat (myDate) {
        return myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDate()
      },

      /**
       * 获取本月是星期几，往前面加空数据
       * @param myDate
       * @returns {number}
       */
      getMonthWeek (myDate) {
        let datOne = new Date(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/1');
        return datOne.getDay() === 0 ? 7 : datOne.getDay()
      }
    }
  }
</script>

<style scoped lang="scss">
    .price-calendar{
        .content-all {
            width: 100%;
            height: 400px;
            color: rgba(70, 81, 102, 1);
            overflow-x: hidden;
            overflow-y: auto;
            text-align: center;
            &::-webkit-scrollbar {
                display: none
            }
        }

        .affirm {
            padding: 16px 40px 12px;

            text-align: center;

            &-hint {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(167, 174, 188, 1);
                line-height: 17px;
                margin-bottom: 8px;
            }

            button {
                margin: auto;
            }
        }

        .content-title {
            display: grid;
            padding: 0 8px;
            grid-template-columns: repeat(7, 46px);
            justify-content: space-between;
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-weight: 400;
            border-bottom: 1px solid rgba(238, 239, 240, 1);
            background: #F6F8FE;

            span {
                font-weight: 400;
                font-size: 15px;
                text-align: center;
                color: rgba(70, 81, 102, 1);
            }
        }

        .content-month {
            padding: 16px 8px 0;

            .date-top {
                padding: 2px 12px;
                display: inline-block;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(54, 61, 78, 1);
                line-height: normal;
                background: rgba(246, 248, 254, 1);
                border-radius: 2px;
                margin: auto;
            }

            .content {
                margin-top: 12px;
                display: grid;
                grid-template-columns: repeat(7, 46px);
                justify-content: space-between;
                width: 100%;

                &-item {
                    font-size: 15px;
                    font-weight: bold;
                    width: 46px;
                    height: 46px;
                    text-align: center;
                    color: rgba(70, 81, 102, 1);

                    &-div {
                        text-align: center;
                        height: 100%;
                        padding-top: 2px;
                        color: rgba(54, 61, 78, 1);

                        span {
                            font-weight: bold;
                            font-size: 18px;
                            font-family: PingFangSC-Medium, PingFang SC;
                            line-height: 25px;
                        }

                        div {
                            font-weight: 400;
                            font-size: 12px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            line-height: 17px;
                        }
                    }
                }

            }
        }


        .isToday {
            background: #4981EE;

            >div {
                color: rgba(255, 255, 255, 1);
            }
            >span {
                color: rgba(255, 255, 255, 1);
            }
        }

        .top-change {
            display: flex;
        }

        .top-change li {
            display: flex;
            color: rgba(70, 81, 102, 1);
            font-size: 14px;
            font-weight: bold;
            flex: 1;
            justify-content: center;
            align-items: center;
            height: 47px;
        }

        .top-change .content-li {
            flex: 2.5;
        }

        .pre {
            width: 12px;
            height: 12px;
            border-top: 1px solid rgba(70, 81, 102, 1);
            border-left: 1px solid rgba(70, 81, 102, 1);
            transform: rotate(-45deg);
        }

        .pre:active, .next:active {
            border-color: rgba(70, 81, 102, 1);
        }

        .next {
            width: 12px;
            height: 12px;
            border-top: 1px solid rgba(70, 81, 102, 1);
            border-right: 1px solid rgba(70, 81, 102, 1);
            transform: rotate(45deg);
        }

        .onClick {
            span, div {
                color: #363d4e !important;
            }
        }

        .no-Click{
            span, div {
                color: #A7AEBC !important;
            }
        }

        .calendar {

            &-mask {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
            }

            &-content {
                position: absolute;
                width: 100%;
                height: auto;
                bottom: 0;
                left: 0;
                background: white;
                display: flex;
                flex-direction: column;
                animation: fadelogIn .5s;
                @keyframes fadelogIn {
                    0% {
                        bottom: -57%;
                    }
                    100% {
                        bottom: 0;
                        -webkit-transform: none;
                        transform: none;
                    }
                }

                &-title {
                    padding: 16px 16px 4px;
                    font-weight: bold;
                    font-size: 21px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    color: rgba(54, 61, 78, 1);
                    line-height: 29px;
                    height: 48px;
                    background: #F6F8FE;
                }
            }
        }
        .button {
            button {
                border: none;
                outline: none;
                width: 100%;
                background: #4981EE;
                border-radius: 8px;
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: bold;
                color: white;
                line-height: 22px;
                padding: 9px 0;
            }
        }
    }
</style>
