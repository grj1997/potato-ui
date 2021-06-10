<template>
  <div class="menu" @scroll="scroll">
    <header style="color: red;"></header>
    <section style="height: 100%;">
      <div class="nav" ref="nav" :class="navClass" :style="{height: (clientHeight - 100 + liberty) + 'px'}">
        <div class="nav-menu" v-for="(item) in menu" :key="item.name">
          <p>{{item.name}}</p>
          <a v-for="cItem in item.children"
             :key="cItem.title"
             @click="goTo(cItem)"
             :class="active === cItem.name ? 'select' : ''">
            {{cItem.name}}
          </a>
        </div>
      </div>
      <div class="container markdown-body">
        <router-view/>
      </div>
      <div class="simulator">
        <iframe @load="loadIframe" id="iframe" src="/mobile.html#/"/>
      </div>
    </section>
  </div>
</template>
<!--菜单-->
<script>
  import menu from '../components/menu'
  let vm = ''
  export default {
    components: {},
    data () {
      return {
        menu,
        active: '',
        navClass: '',
        clientHeight: '',
        haveScroll: false,
        timer: '',
        liberty: 0,
        dMobile: ''
      }
    },
    watch:{
      '$route': (to, from) => {
        vm.active = to.name
        console.log(to, from)
        vm.dMobile.$router.replace({
          name: to.name
        })
      },
      clientHeight(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.clientHeight = val
          this.timer = true
          let that = this
          setTimeout(function(){
            // 打印screenWidth变化的值
            that.timer = false
          },400)
        }
      }
    },
    mounted () {
      const that = vm = this
      this.active = this.$route.name
      that.clientHeight = document.body.clientHeight - 60
      window.onresize = () => {
        return (() => {
          window.clientHeight = document.body.clientHeight
          that.clientHeight = window.clientHeight
          this.liberty = -60
        })()
      }
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    },
    methods:{
      goBack () {
        console.log('----')
      },
      loadIframe () {
        this.dMobile = document.getElementById('iframe').contentWindow.dMobile
        vm.dMobile.$router.replace({
          name: this.active
        })
      },
      goTo (item) {
        console.log(item.name)
        this.active = item.name
        this.$router.push({
          name: item.name
        })
      },
      scroll (e){
        if (e.srcElement.scrollTop >= 60 && this.navClass !== 'nav-t-0') {
          this.navClass = 'nav-t-0'
        }
        if ((e.srcElement.scrollTop < 60) && this.navClass !== '') {
          this.navClass = ''
        }
        if (e.srcElement.scrollTop < 60) {
          this.$refs.nav.style.top = (60 - e.srcElement.scrollTop) + 'px'
          this.liberty = e.srcElement.scrollTop
        } else{
          this.$refs.nav.style.top = '0'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .menu {
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width : 10px;
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      background   : #b1b1b1;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background   : #ededed;
    }
    header{
      height: 60px;
      width: 100%;
      user-select: none;
      background: #001938;
    }
    section{
      position: relative;
      height: 100%;
      .nav{
        position: fixed;
        min-width: 220px;
        max-width: 220px;
        padding: 24px 0 72px;
        overflow-y: scroll;
        background-color: #fff;
        box-shadow: 0 8px 12px #ebedf0;
        top: 60px;
        left: 0;
        z-index: 1;
        &::-webkit-scrollbar {
          width : 10px;
          height: 1px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 10px;
          box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
          background   : #b1b1b1;
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          background   : #ededed;
        }
        &-menu{
          p{
            color: #455a64;
            font-weight: 600;
            font-size: 15px;
            line-height: 28px;
            padding: 8px 0 8px 30px;
            margin: 0;
          }
          a{
            text-decoration: none;
            cursor: pointer;
            margin: 0;
            display: block;
            color: #455a64;
            font-size: 14px;
            line-height: 28px;
            -webkit-transition: color 0.2s;
            transition: color 0.2s;
            padding: 8px 0 8px 30px;
            &:hover{
              color: #4fc08d;
            }
          }
          .select{
            color: #4fc08d;
          }
        }
      }
      .nav-t-0{
        top: 0;
      }
      .container{
        width: 100%;
        padding-right: 450px;
        box-sizing: border-box;
        padding-left: 230px;
        overflow: hidden;
      }
      .simulator{
        position: fixed;
        top: 80px;
        right: 30px;
        width: 365px;
        height: 667px;
        z-index: 1;
        margin-right: 20px;
        background: #fafafa;
        border-radius: 12px;
        box-shadow: #ebedf0 0 4px 12px;
        iframe{
          width: 100%;
          height: 100%;
          border: 0;
        }
      }
      @media (max-width: 1100px) {
        .simulator{
          left: 750px;
          right: auto;
        }
      }
    }
  }
</style>