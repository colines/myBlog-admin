<template>
  <div class="header">
    <div class="info">
      <div class="info-box" @mouseover="settingShow" @mouseout="settingHide">
        <div class="info-img">
          <img src="../../../../static/Davi.jpg" alt="">
        </div>
      </div>
        <div class="setting" v-show="isShow" @mouseover="settingShow" @mouseout="settingHide">
          <a href="">设置</a>
          <a href="">退出</a>
        </div>
      <ul>
        <li>
          <a-badge dot>
            <span class="iconfont" title="留言">&#xe61e;</span>
          </a-badge>
        </li>
        <li>
          <a-badge :count="2">
            <span class="iconfont " title="评论">&#xe6a7;</span>
          </a-badge>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
      }
    },
    methods: {
      settingShow() {
        this.isShow = true;
      },
      settingHide() {
        this.isShow = false;
      }
    },

  }

</script>

<style scoped>
  .header {
    width: 84%;
    height: 59px;
    background: #fff;
    position: fixed;
    right: 0;
    top: 0;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.06);
    z-index: 99;
  }


  .info {
    position: relative;
  }

  .info ul li {
    float: right;
    width: 5%;
    height: 50px;
    line-height: 50px;
    margin-top: 8px;
  }

  .info-box{
    float: right;
    width: 40px;
    height: 60px;
    margin: 8px 120px 0 0;
    z-index: 99;
  }
  .info-img {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  .info-img img {
    width: 100%;
  }
  .setting {
    position: absolute;
    top: 50px;
    right: 100px;
    width: 80px;
    height: 95px;
    background: #fff;
    border-color: #ddd;
    border-radius: 2px;
    padding-top: 15px;
    z-index: 1;
  }

  .setting a {
    display: block;
    width: 80px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #333;
    cursor: pointer;
  }

  .setting a:hover {
    color: #f00;
  }


  .iconfont {
    font-size: 20px;
    color: #888;
    cursor: pointer;
  }

  .iconfont:hover {
    font-size: 25px;
  }

</style>
