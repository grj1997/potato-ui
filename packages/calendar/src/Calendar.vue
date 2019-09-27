<template>
  <div class="calendar">
    <div class="calendar-mask" v-show="visible" @touchmove.prevent @click.stop="close">
      <div class="calendar-content" @click.stop>
        <div class="calendar-content-title">
          <span @click="close">取消</span>
          <em>{{title}}</em>
          <span @click="selectDate">确定</span>
        </div>
        <div class="content-all">
          <div class="top-change">
            <li @click="preMonth">
              <div class="pre"></div>
            </li>
            <li class="content-li">{{dateTop}}</li>
            <li @click="nextMonth">
              <div class="next"></div>
            </li>
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
          <div class="content">
            <div class="content-item" v-for="(item, index) in list" :key="index" @click="clickDay(item, index)">
              <div :class="{ isToday: item.isToday, isMark: item.isMark, nextDayShow: isHideOtherDay && item.nextDayShow}">
                {{item.id}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pCalendar',

    props: {
      // 头部标题
      title: {
        type: String,
        default () {
          return '请选择日期'
        }
      },
      // 未来第五天
      timeRange: {
        type: Date,
        default () {
          let nowDate = new Date();
          return new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 6);
        }
      },
      // 是否显示
      value: {
        type: Boolean,
        default () {
          return false
        }
      },
      markArray: {
        type: Array,
        default () {
          return []
        }
      },
      isHideOtherDay: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    data () {
      return {
        list: [],
        dateTop: '',
        myDate: new Date(),
        selectUseDate: {}
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
       *  点击日期
       */
      clickDay (item) {
        if (item.id) {
          if (!(this.isHideOtherDay && item.nextDayShow)) {
            this.selectUseDate = {
              date: item.date,
              weekN: item.weekN,
              weekC: item.weekC,
              isToday: item.isToday,
              dateC: item.dateC
            };
            this.list.map(i => {
              i.isToday = i.id === item.id;
              return i;
            });
          }
        }
      },

      /**
       *  点击上月
       */
      preMonth () {
        this.myDate = this.getPreMonth(this.myDate);
        this.$emit('changeMonth', this.dataFormat(this.myDate));
        this.getList()
      },

      /**
       *  点击下月
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
        this.dateTop = myDate.getFullYear() + '年' + mygetMonth + '月';
        let array = [];
        for (let index = 1, dates = this.getDaysInOneMonth(myDate); index <= dates; index++) {
          let listDay = new Date(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + index);

          let nowDate = new Date();

          let lastDay = new Date(nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + (nowDate.getDate() - 1));

          let isNextDay = listDay.getTime() - lastDay.getTime() > 0;  // true

          let isRangeDay = this.timeRange.getTime() - listDay.getTime() > 0; // true

          // nextDayShow false则展示 true则不展示
          let m = myDate.getMonth() + 1
          let obj = {
            id: index,
            date: myDate.getFullYear() + '/' + (m < 10 ? '0' + m : m) + '/' + (index < 10 ? '0' + index : index),
            isMark: this.markArray.indexOf(index) >= 0,
            nextDayShow: !(isNextDay && isRangeDay)
          };
          if (this.dataFormat(new Date()) === this.dataFormat(new Date(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + index))) {
            // 当天isToday = true
            obj.isToday = true;
            array = array.concat(obj);
            obj = this.getWeek(obj, index - 1) // 返回周几的日期索引是从0开始 所以减一
            this.selectUseDate = {
              date: obj.date,
              weekN: obj.weekN,
              weekC: obj.weekC,
              isToday: obj.isToday,
              dateC: obj.dateC
            };
            this.$emit('isToday', this.dataFormat(new Date(myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + index)))
          } else {
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
        this.list = [...array2, ...array]
        // 返回周几
        this.list.map((item, index) => {
          return this.getWeek(item, index)
        })
      },

      /**
       * 根据日期对象 返回周几拼装到日期对象
       * item [Object] 日期
       * index [Number] 日期的索引
       * @returns {Object} 日期  + 周几 + dateC [String] 中文日期
       */
      getWeek (item, index) {
        let _item
        let _index = index % 7
        let week = '星期'
        let dateC = ''
        if (item.date) {
          let date = item.date.split('/')
          let y = date[0] + '年'
          let m = date[1] + '月'
          let d = date[2] + '日'
          dateC = y + m + d
        }
        /**
         * weekN [Number] 周几阿拉伯数字
         * weekC [String] 周几中文
         * dateC [String] 中文日期
         */
        switch (_index) {
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
  * {
    margin: 0;
    padding: 0;
  }

  .content-all {
    width: 100%;
    color: rgba(70, 81, 102, 1);
    overflow: hidden;
  }

  .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    width: 100%;

    &-item {
      font-size: 15px;
      font-weight: bold;
      width: calc(100% / 7);
      height: 40px;
      line-height: 48px;
      text-align: center;
      color: rgba(70,81,102,1);
    }

    &-title {
      display: flex;
      justify-content: flex-start;
      height: 40px;
      line-height: 40px;
      margin: 0 10px;
      font-weight: 400;
      border-bottom: 1px solid rgba(238, 239, 240, 1);

      span {
        font-weight: 400;
        font-size: 15px;
        width: calc(100% / 7);
        text-align: center;
        color: rgba(70,81,102,1);
      }
    }
  }

  .isToday {
    width: 28px;
    height: 28px;
    margin: 8px auto;
    border-radius: 50%;
    line-height: 30px;
    background: rgba(255, 168, 9, 1);
    box-shadow: 0 2px 4px 0 rgba(255,168,9,0.3);
    color: rgba(255, 255, 255, 1);

  }
  .isMark{
    width: 9vmin;
    height: 9vmin;
    line-height: 9vmin;
    margin: auto;
    margin-top: 0.65vmin;
    border-radius: 100px;
    border:1px solid red;
    z-index: 2;
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
  .nextDayShow{
    font-weight:400;
    color:rgba(165,170,179,1);
  }
  .calendar {

    &-mask {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    &-content {
      position: absolute;
      width: 100%;
      min-height: 329px;
      height: 57%;
      bottom: 0;
      left: 0;
      background: white;

      &-title {
        display: flex;
        justify-content: space-between;
        padding: 12px 16px 4px;
        font-size: 16px;
        line-height: 22px;

        span {
          font-weight: 400;
          color: rgba(255,168,9,1);
        }

        em {
          font-weight: bold;
          color: rgba(70,81,102,1);
        }
      }

      &-title {
        font-size:16px;
        font-weight: bold;
        background: white;
      }
    }
  }
</style>
