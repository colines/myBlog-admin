<template>
  <div class="nav">
    <h4 class="nav-h4">
      <span class="name">Darcy</span>
      <span class="iconfont">&#xe61c;</span>
    </h4>
    <div class="side-bar">
      <a-menu mode="inline" theme="dark" :defaultSelectedKeys="[selectedKey]">
        <template v-for="item in navList">
          <a-menu-item v-if="!item.children" :key="item.key" @click="changeUrl(item.key)">
            <span class="iconfont" v-html="item.iconCode"></span>
            <span>{{item.title}}</span>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.key" />
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
  import SubMenu from './SubMenu.vue'
  export default {
    components: {
      'sub-menu': SubMenu,
    },
    created() {
      this.selectedKey = this.$route.name;//页面刷新获取地址的name属性，导航选中该name属性对应的菜单项
    },
    data() {
      return {
        selectedKey:'homePage',//导航默认中系统首页
        navList: [
        {
            key: 'homePage',
            title: '系统首页',
            iconCode:'&#xe603;'
          },
          {
            key: 'article',
            title: '博文管理',
            iconCode:'&#xe67c;'
          },
          {
            key: 'category',
            title: '类别管理',
            iconCode:'&#xe640;'
          },
          {
            key: 'tag',
            title: '标签管理',
            iconCode:'&#xe636;'
          },
          {
            key: 'comments',
            title: '评论管理',
            iconCode:'&#xe6a7;'
          },
          {
            key: 'leavewords',
            title: '留言管理',
            iconCode:'&#xe61e;'
          },
          {
            key: 'photo',
            title: '图片管理',
            iconCode:'&#xe615;'
          },
          {
            key: 'links',
            title: '链接管理',
            iconCode:'&#xe63e;'
          },
          {
            key: 'info',
            title: '个人设置',
            iconCode:'&#xe61b;',
            children:[
              {
                key:'adminInfo',
                title:'个人信息',
                iconCode:'&#xe63c;'
              },
              {
                key:'pwdModify',
                title:'修改密码',
                iconCode:'&#xe64b;'
              },
            ]
          }
      ],
      }
    },
    methods: {
      changeUrl(url) {
        this.$router.push({
          name: url
        });
      },
    },

  }

</script>

<style scoped>
  
  .nav {
    width: 16%;
    background: #2C3B48;
    color: rgba(255, 255, 255, .8);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .nav-h4 {
    height: 59px;
    line-height: 59px;
    text-align: center;
    font-weight: 600;
    border-bottom: 1px solid #4b545c;
    background: #3C434D;
  }
  .nav-h4 .name{
    font-size: 20px;
    color: rgb(241, 236, 236);
  }

  .nav-h4 .iconfont{
    font-size: 25px;
    margin-left: 10px;
    font-weight: 600;
    color: #8DA8FF;
  }

  .side-bar {
    width: 110%;
    height: 100vh;
    min-width: 120px;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #2C343F;
  }

  .ant-menu {
    background: #2C343F !important;
  }
  .iconfont{
    margin-right: 10px;
  }

</style>
